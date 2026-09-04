import { fail } from "@akasha/command-system/command-failing"
import { AKASHA, akashaRoot, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { seatId } from "@akasha/seat-system/read-record"
import { handlerDerives, personaIsHers, refuseAnswering } from "@akasha/seat-system/seat-answering"
import { parseArgs } from "@akasha/seat-system/seat-args"
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

export async function run(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(SEAT_HELP)
    return
  }
  const args = parseArgs(argv)
  const roots = resolveRoots()
  const pages = akashaRoot()

  if (args.resolve) {
    if (args.asDefault) {
      process.stdout.write(defaultLines(pages).join("\n") + "\n")
      return
    }
    const resolved = resolveAttributes(args.set, args.tokens, pages, scan(pages))
    if ("refusals" in resolved) {
      process.stderr.write(
        ["refused:", ...resolved.refusals.map((one) => `  ${one}`), "nothing was resolved"].join(
          "\n"
        ) + "\n"
      )
      process.exit(1)
    }
    process.stdout.write(
      resolved.assigned.map((one) => `${one.slot}=${one.slug}`).join("\n") + "\n"
    )
    return
  }
  if (args.name) {
    const nameable = nameableStated(args.set, args.flex, args.principal)
    const spelled = composeSeatName(nameable, pages)
    if (spelled === null) {
      process.stderr.write(
        "refused: these attributes spell no name — state a persona, a domain or a role\n"
      )
      process.exit(1)
    }
    process.stdout.write(`${spelled}\n`)
    return
  }
  if (args.tokens.length > 0) {
    fail("--token is sorted against the pages and states nothing — it needs --resolve")
  }

  const own = seatId()
  const agent = args.agent ?? own
  if (agent === null) {
    fail(
      "neither AGENT_ID nor CLAUDE_CODE_SESSION_ID is set, so nothing stated could be attributed to you — " +
        "set one, or name it with --agent"
    )
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
      fail(
        "--default writes where nothing is held and --clear unsets what is, so one call cannot mean both"
      )
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
    if (args.asDefault) {
      process.stdout.write([...notes, `seat:   ${agent}`].join("\n") + "\n")
      return
    }
    process.stderr.write(
      [...notes, "error: nothing to state — name at least one attribute or --mode"].join("\n") +
        "\n"
    )
    process.exit(1)
  }

  const heldPrincipal = principal ?? principalOf(agent)?.value ?? null
  const openedByPerson = heldPrincipal !== null && personPrincipals(pages).includes(heldPrincipal)
  const refused = [
    ...(initiative === null ? [] : refuseInitiative(initiative, rootFor(roots, AKASHA))),
    ...(args.flex === null
      ? []
      : refuseFlex(args.flex, agent, own, (at) =>
          launchStating(launchOf(at), openedByPerson, args.parentName)
        )),
  ]
  const found: Found = slugsInTree()
  const resolved = resolveAttributes(set, [], pages, found)
  const stop = (all: readonly string[]): undefined => {
    process.stderr.write(
      [...notes, "refused:", ...all.map((one) => `  ${one}`), "nothing was stated"].join("\n") +
        "\n"
    )
    process.exit(1)
  }
  if ("refusals" in resolved) {
    stop([...resolved.refusals, ...refused])
    return
  }
  if (refused.length > 0) {
    stop(refused)
    return
  }
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
    if (wrong.length > 0) {
      stop(wrong)
      return
    }
  }
  const nameable = nameableFrom(agent, standing, args.flex, principal, args.clear)
  const seatName = nameStanding(agent, pages, nameable)
  const followed = await followName(agent, pages, nameable, args.takeLiveName)
  if (followed.kind === "refused") {
    stop([followed.reason])
    return
  }
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
      stop([
        `${akashaSeatRelPath(seatName)} was not written, so it stands at what it last held until the next heartbeat — ${(page.detail.split("\n")[0] ?? "").trim()}`,
      ])
      return
    }
    if (page.kind === "unstated") {
      stop([
        `${akashaSeatRelPath(seatName)} was not written: a seat page needs a persona, a domain, a role, ` +
          "a principal, a start mode and a registration, and a seat whose principal is not a person " +
          "also needs the seat above it",
      ])
      return
    }
  }
  const cleared = args.clear.length > 0 ? [`clear:  ${args.clear.join(", ")}`] : []
  process.stdout.write(
    [
      ...notes,
      ...cleared,
      `seat:   ${agent}`,
      "",
      "An armed gate names what you must read, and refuses everything but Read, Grep and Glob until you have.",
    ].join("\n") + "\n"
  )
}

if (import.meta.main) await run(process.argv.slice(2))
