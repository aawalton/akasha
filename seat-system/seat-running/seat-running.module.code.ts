import { AKASHA, akashaRoot, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { seatId } from "@akasha/seat-system/read-record"
import { handlerDerives, personaIsHers, refuseAnswering } from "@akasha/seat-system/seat-answering"
import { type Args, parseArgs } from "@akasha/seat-system/seat-args"
import { attributeFor } from "@akasha/seat-system/seat-attribute"
import { defaultLines } from "@akasha/seat-system/seat-defaults"
import { SEAT_HELP } from "@akasha/seat-system/seat-help"
import { nameStanding } from "@akasha/seat-system/seat-name-stands"
import { nameableFrom, nameableStated } from "@akasha/seat-system/seat-nameable"
import { writeSeatPage } from "@akasha/seat-system/seat-page-writing"
import { composedNameOf, followName } from "@akasha/seat-system/seat-rename"
import {
  composeSeatName,
  personPrincipals,
} from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  ATTRIBUTES,
  type Attribute,
  type AttributeKey,
  attributesOf,
  DECLARATIONS,
  type Declaration,
  recordedModeOf,
} from "../seat-attributes/seat-attributes.module.code.ts"
import { launchOf, launchStating, refuseFlex } from "../seat-flex/seat-flex.module.code.ts"
import { refuseInitiative } from "../seat-initiative/seat-initiative.module.code.ts"
import { akashaSeatRelPath } from "../seat-page-akasha/seat-page-akasha.module.code.ts"
import { statedFromHistory } from "../seat-page-history/seat-page-history.module.code.ts"
import { principalOf } from "../seat-principal/seat-principal.module.code.ts"
import {
  defaultFor,
  defaultSlots,
  type Found,
  resolveAttributes,
  scan,
} from "../seat-resolve/seat-resolve.module.code.ts"
import { statedNow } from "../seat-stated/seat-stated.module.code.ts"

// WHAT A STATING CAME TO IS ANSWERED RATHER THAN PRINTED, AND A REFUSAL IS AN ANSWER RATHER THAN AN
// EXIT. A supervisor states a seat's defaults while it is booting the session it holds open, so a
// write refused here has to come back as words that caller can report on. Ending the process would
// end the supervisor with it.
export type SeatStated =
  | { readonly kind: "stated"; readonly report: string }
  | { readonly kind: "refused"; readonly said: string }

// Each answer carries the exact bytes the command writes, so the shell over this function chooses a
// stream and an exit code and composes nothing.
function stated(lines: readonly string[]): SeatStated {
  return { kind: "stated", report: lines.join("\n") + "\n" }
}

function refused(lines: readonly string[]): SeatStated {
  return { kind: "refused", said: lines.join("\n") + "\n" }
}

export async function run(args: Args): Promise<SeatStated> {
  const roots = resolveRoots()
  const pages = akashaRoot()

  if (args.resolve) {
    if (args.asDefault) return stated(defaultLines(pages))
    const resolved = resolveAttributes(args.set, args.tokens, pages, scan(pages))
    if ("refusals" in resolved) {
      return refused([
        "refused:",
        ...resolved.refusals.map((one) => `  ${one}`),
        "nothing was resolved",
      ])
    }
    return stated(resolved.assigned.map((one) => `${one.slot}=${one.slug}`))
  }
  if (args.name) {
    const nameable = nameableStated(args.set, args.flex, args.principal)
    const spelled = composeSeatName(nameable, pages)
    if (spelled === null) {
      return refused([
        "refused: these attributes spell no name — state a persona, a domain or a role",
      ])
    }
    return stated([spelled])
  }
  if (args.tokens.length > 0) {
    return refused([
      "error: --token is sorted against the pages and states nothing — it needs --resolve",
    ])
  }

  const own = seatId()
  const agent = args.agent ?? own
  if (agent === null) {
    return refused([
      "error: neither AGENT_ID nor CLAUDE_CODE_SESSION_ID is set, so nothing stated could be " +
        "attributed to you — set one, or name it with --agent",
    ])
  }

  const set: Partial<Record<Declaration, string>> = { ...args.set }
  const notes: string[] = []

  let initiative = args.initiative
  let onCall = args.onCall
  let fromHistoryPrincipal: string | null = null
  if (args.fromHistory) {
    const name = composedNameOf(agent)
    const held = name === null ? null : statedFromHistory(name, roots)
    if (name === null) {
      notes.push("note:   this seat has no name yet, so no page of its own stands in history")
    } else if (held === null) {
      notes.push(`note:   no page for \`${name}\` stands in akasha's history`)
    } else {
      for (const key of DECLARATIONS) {
        const value = held.set[key]
        if (value !== undefined && set[key] === undefined) set[key] = value
      }
      if (initiative === null) initiative = held.initiative
      if (!onCall) onCall = held.onCall
      fromHistoryPrincipal = held.principal
      notes.push(
        `note:   read back from ${held.commit.slice(0, 8)}, the commit that last held \`${name}\`'s page`
      )
    }
  }

  let scanned: Found | null = null
  const slugsInTree = (): Found => (scanned ??= scan(pages))

  const stands = attributesOf(agent)

  let mode = args.mode
  if (args.asDefault) {
    if (args.clear.length > 0) {
      return refused([
        "error: --default writes where nothing is held and --clear unsets what is, so one call " +
          "cannot mean both",
      ])
    }
    for (const key of ATTRIBUTES) {
      const standing = stands[key]
      if (standing === undefined || set[key] === undefined) continue
      notes.push(
        `note:   ${key} stands at \`${standing.slug}\` — a default does not replace what is held`
      )
      delete set[key]
    }
    for (const slot of defaultSlots(pages)) {
      if (stands[slot] !== undefined || set[slot] !== undefined) continue
      const slug = defaultFor(slot, pages)
      if (slug !== null) set[slot] = slug
    }
    if (mode !== null && recordedModeOf(agent) !== null) mode = null
  }

  const shaping = set["role"] !== undefined || set["domain"] !== undefined
  const derived = handlerDerives(
    pages,
    set["role"] ?? stands["role"]?.slug ?? null,
    set["domain"] ?? stands["domain"]?.slug ?? null
  )
  if (shaping && derived.persona !== null) {
    const heldPersona = set["persona"] ?? stands["persona"]?.slug ?? null
    if (!personaIsHers(pages, heldPersona)) {
      set["persona"] = derived.persona
      notes.push(
        `note:   persona \`${derived.persona}\` is who \`${derived.principal}\` hears from`
      )
    }
  }
  let principal = args.principal ?? fromHistoryPrincipal
  if (principal === null && shaping && derived.principal !== null && principalOf(agent) === null) {
    principal = derived.principal
    notes.push(`note:   principal \`${derived.principal}\`, the person this handler serves`)
  }

  const named = DECLARATIONS.filter((key) => set[key] !== undefined)
  const quiet =
    args.clear.length === 0 &&
    mode === null &&
    initiative === null &&
    args.flex === null &&
    args.principal === null &&
    args.registration === null &&
    !onCall
  if (named.length === 0 && quiet) {
    if (args.asDefault) return stated([...notes, `seat:   ${agent}`])
    return refused([...notes, "error: nothing to state — name at least one attribute or --mode"])
  }

  const heldPrincipal = principal ?? principalOf(agent)?.value ?? null
  const openedByPerson = heldPrincipal !== null && personPrincipals(pages).includes(heldPrincipal)
  const refusals = [
    ...(initiative === null ? [] : refuseInitiative(initiative, rootFor(roots, AKASHA))),
    ...(args.flex === null
      ? []
      : refuseFlex(args.flex, agent, own, (at) =>
          launchStating(launchOf(at), openedByPerson, args.parentName)
        )),
  ]
  const found: Found = slugsInTree()
  const resolved = resolveAttributes(set, [], pages, found)
  const stop = (all: readonly string[]): SeatStated =>
    refused([...notes, "refused:", ...all.map((one) => `  ${one}`), "nothing was stated"])
  if ("refusals" in resolved) return stop([...resolved.refusals, ...refusals])
  if (refusals.length > 0) return stop(refusals)
  const held: { -readonly [K in AttributeKey]?: Attribute } = {}
  for (const one of resolved.assigned) {
    const key = ATTRIBUTES.find((slot) => slot === one.slot)
    if (key !== undefined) held[key] = attributeFor(one.slug)
  }

  const standing: { -readonly [K in AttributeKey]?: Attribute } = { ...stands, ...held }
  for (const key of args.clear) {
    const which = ATTRIBUTES.find((slot) => slot === key)
    if (which !== undefined) delete standing[which]
  }
  if (set["persona"] !== undefined || principal !== null || args.clear.includes("persona")) {
    const wrong = refuseAnswering(pages, {
      persona: standing["persona"]?.slug ?? null,
      principal: principal ?? principalOf(agent)?.value ?? null,
    })
    if (wrong.length > 0) return stop(wrong)
  }
  const nameable = nameableFrom(agent, standing, args.flex, principal, args.clear)
  const seatName = nameStanding(agent, pages, nameable)
  const followed = await followName(agent, pages, nameable, args.takeLiveName)
  if (followed.kind === "refused") return stop([followed.reason])
  if (followed.kind === "renamed") notes.push(`name:   ${followed.name}`)

  const nowOnCall = onCall
  if (seatName !== null) {
    const said = {
      clear: args.clear,
      flex: args.flex,
      initiative,
      mode,
      onCall: nowOnCall,
      principal,
      registration: args.registration,
    }
    const page = await writeSeatPage(statedNow(agent, standing, said), seatName, args.parentName)
    if (page.kind === "refused") {
      return stop([
        `${akashaSeatRelPath(seatName)} was not written, so it stands at what it last held until the next heartbeat — ${(page.detail.split("\n")[0] ?? "").trim()}`,
      ])
    }
    if (page.kind === "unstated") {
      return stop([
        `${akashaSeatRelPath(seatName)} was not written: a seat page needs a persona, a domain, a role, ` +
          "a principal, a start mode and a registration, and a seat whose principal is not a person " +
          "also needs the seat above it",
      ])
    }
  }
  const cleared = args.clear.length > 0 ? [`clear:  ${args.clear.join(", ")}`] : []
  return stated([
    ...notes,
    ...cleared,
    `seat:   ${agent}`,
    "",
    "An armed gate names what you must read, and refuses everything but Read, Grep and Glob until you have.",
  ])
}

// THE ONE SHELL OVER THE STATING, so that the words a refusal answers and the words the command
// prints cannot drift apart. The seat call is a shell over this, and this file's own entry point is
// the same shell, which is why the help is read here rather than inside the function.
export async function stateSeatFromArgv(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(SEAT_HELP)
    return
  }
  const answer = await run(parseArgs(argv))
  if (answer.kind === "refused") {
    process.stderr.write(answer.said)
    process.exit(1)
  }
  process.stdout.write(answer.report)
}

if (import.meta.main) await stateSeatFromArgv(process.argv.slice(2))
