import { patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { agentPathOf } from "@akasha/context/warranting"
import { said as gitSaid } from "@akasha/git/git-running"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { textAt as textIn, valueAt } from "@akasha/pages-system/page-value"
import { applied } from "../../command-system/applying/applying.module.code.ts"
import {
  BREAK_GLASS,
  bypassedIn,
  formattingIn,
  glassSaid,
  mistaking,
  textAt,
  textOf,
  unloadableIn,
} from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import {
  DROPPED,
  droppedPatch,
  type Rebased,
  rebasedOnto,
  resolved,
} from "../../command-system/drafting/drafting.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"
import { gateBuilt, NO_GATE } from "../../command-system/gate-building/gate-building.module.code.ts"
import { baseOf, changeOf } from "../../command-system/landing/landing.module.code.ts"
import { formattedSaid } from "../../command-system/landing-saying/landing-saying.module.code.ts"
import {
  added,
  type Blobs,
  blobsIn,
  deleted,
} from "../../command-system/patching/patching.module.code.ts"
import type { Piping } from "../../command-system/piping/piping.module.code.ts"
import {
  inputIn,
  markingIn,
  pipedIn,
  RUNS_SAID,
} from "../../command-system/piping/piping.module.code.ts"
import {
  CONTENT_FILE,
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  offRepo,
  pathAt,
  unknownIn,
  valuesOf,
} from "../write/write.command.code.ts"

export const APPLY = "apply"

export const DROP = "drop"

export const SHOW = "show"

export const RESOLVE = "resolve"

const ACTS = [APPLY, DROP, SHOW, RESOLVE]

const APPLYING = [MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const SHOWING = [FILE_PATH]

const RESOLVING = [FILE_PATH, CONTENT_FILE]

const BARE: readonly string[] = []

const BYTES = new TextEncoder()

const NONE = "nothing is drafted here, so no patch is kept"

const SUBAGENT = "subagent"

const SEAT_KEY = "principalSeatName"

function seatOver(root: string, page: string): string | null {
  const said = partedIn(page)
  if (said === null || said.pageType !== SUBAGENT) return null
  const value = valueAt(page, root)
  return value === null ? null : textIn(value, SEAT_KEY)
}

function noneSaid(root: string, page: string): string {
  const seat = seatOver(root, page)
  if (seat === null) return NONE
  return `${NONE} — a subagent's draft goes to its seat when the subagent stops, so ask the ${seat} seat for what was drafted here before`
}

const NO_PAGE = "this call names no agent whose page a patch would be kept beside"

const NOT_HELD = "the patch carries no body at"

const NO_REBASE = "the patch does not rebase onto the commit at HEAD"

const MOVED = " — moved under the patch since it was drafted"

const WHY = "the patch this agent drafted"

function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function markOf(one: Blobs): string {
  if (added(one)) return "added"
  if (deleted(one)) return "taken away"
  return "changed"
}

function markAt(was: Uint8Array | null, body: Uint8Array | null): string {
  if (was === null) return "added"
  if (body === null) return "taken away"
  return "changed"
}

function shownIn(held: string, said: Rebased | { readonly why: string }): readonly string[] {
  if ("why" in said) {
    return [...blobsIn(held)].map(([path, blobs]) => `${markOf(blobs)} ${path}`)
  }
  return [...said.held].map(([path, one]) => {
    const after = said.moved.includes(path) ? MOVED : ""
    return `${markAt(one.was, one.body)} ${path}${after}`
  })
}

function clashSaid(path: string): string {
  return `${path} carries a conflict — resolve it in the patch before the patch applies`
}

function notTextSaid(path: string, many: number): string {
  return `${path} is ${String(many)} bytes that are not text, so no body is shown for it`
}

function linesOf(body: string): readonly string[] {
  const held = body.split("\n")
  return held.at(-1) === "" ? held.slice(0, -1) : held
}

function onePathIn(
  root: string,
  argv: readonly string[],
  valued: readonly string[]
): { readonly path: string } | { readonly refusals: readonly string[] } {
  const said = valuesOf(argv, FILE_PATH, valued)
  if (said.length === 0) {
    return { refusals: [`${FILE_PATH} names the path to act on, and none is given`] }
  }
  if (said.length > 1) {
    return { refusals: [`${FILE_PATH} is given ${said.length} times, and one act names one path`] }
  }
  const one = said[0]
  if (one === undefined || one === null) {
    return { refusals: [`${FILE_PATH} takes a path, and none follows it`] }
  }
  const path = pathAt(root, one)
  return path === null ? { refusals: [offRepo(one)] } : { path }
}

export function showing(root: string, page: string): Answer {
  const held = patchIn(root, page)
  if (held === null) return { report: [noneSaid(root, page)], refusals: [], code: 0 }
  const said = rebasedOnto(root, headOf(root), held)
  const clashed = "why" in said ? [] : said.clashed
  const tail = "why" in said ? [`${NO_REBASE} — ${said.why}`] : []
  return {
    report: [
      ...[...shownIn(held, said)].sort(),
      ...clashed.map(clashSaid),
      `the patch is kept at ${patchAt(page)}`,
      ...tail,
    ],
    refusals: [],
    code: 0,
  }
}

export function showingBody(root: string, page: string, argv: readonly string[]): Answer {
  const unknown = unknownIn(argv, SHOWING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const named = onePathIn(root, argv, SHOWING)
  if ("refusals" in named) return mistaking(named.refusals)
  const held = patchIn(root, page)
  if (held === null) return { report: [noneSaid(root, page)], refusals: [], code: 0 }
  const said = rebasedOnto(root, headOf(root), held)
  if ("why" in said) {
    return { report: [], refusals: [`${NO_REBASE} — ${said.why}`], code: 2 }
  }
  const one = said.held.get(named.path)
  if (one === undefined) return mistaking([`${NOT_HELD} ${named.path}`])
  if (one.body === null) {
    return { report: [`the patch takes ${named.path} away`], refusals: [], code: 0 }
  }
  const body = textOf(one.body)
  if (body === null) {
    return { report: [notTextSaid(named.path, one.body.length)], refusals: [], code: 0 }
  }
  return { report: linesOf(body), refusals: [], code: 0 }
}

export function dropping(root: string, page: string): Answer {
  const at = patchAt(page)
  if (at === null || patchIn(root, page) === null) {
    return { report: [noneSaid(root, page)], refusals: [], code: 0 }
  }
  droppedPatch(root, page, DROPPED)
  return { report: [`the patch kept at ${at} is taken away`], refusals: [], code: 0 }
}

function bodyIn(
  given: Given,
  argv: readonly string[],
  path: string,
  piping: Piping
): { readonly body: string } | { readonly refusals: readonly string[] } {
  const from = valuesOf(argv, CONTENT_FILE, RESOLVING)
  if (from.length > 1) {
    return {
      refusals: [`${CONTENT_FILE} is given ${from.length} times, and one path takes one body`],
    }
  }
  const one = from[0]
  if (one !== undefined) {
    if (one === null) return { refusals: [`${CONTENT_FILE} takes a file, and none follows it`] }
    const read = textAt(one)
    return read === null
      ? { refusals: [`${CONTENT_FILE} ${one} could not be read as text`] }
      : { body: read }
  }
  const held = pipedIn(piping, path, {
    bare: (at) =>
      `${RESOLVE} reads the body for ${at} from the input, and nothing is piped in — say it as` +
      ` \`${given.calledAs} ${RESOLVE} ${FILE_PATH} ${at} <<'EOF'\`, then the body,` +
      " then `EOF` on a line of its own",
    opening: (at, why) =>
      `the body for ${at} is read from the input, and the input would not open — ${why}`,
  })
  if ("refusals" in held) return { refusals: held.refusals }
  if ("none" in held) return { refusals: [`${RESOLVE} names no body for ${path}`] }
  const body = textOf(held.bytes)
  if (body === null) return { refusals: [`the body piped in for ${path} is not text`] }
  if (markingIn(body)) {
    return {
      refusals: [
        `the body piped in for ${path} holds a line beginning with ${RUNS_SAID}, so the` +
          ` conflict there is unresolved — take the marks out, or hand the body in at` +
          ` ${CONTENT_FILE} where a line of the body begins that way`,
      ],
    }
  }
  return { body }
}

export async function resolving(
  given: Given,
  page: string,
  argv: readonly string[],
  piping: Piping
): Promise<Answer> {
  const unknown = unknownIn(argv, RESOLVING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const named = onePathIn(given.root, argv, RESOLVING)
  if ("refusals" in named) return mistaking(named.refusals)
  if (patchIn(given.root, page) === null) return mistaking([noneSaid(given.root, page)])
  const held = bodyIn(given, argv, named.path, piping)
  if ("refusals" in held) return mistaking(held.refusals)
  const built = gateBuilt(given.root)
  if (!("gate" in built)) {
    return { report: [], refusals: [`the checks would not load — ${built.broken}`], code: 3 }
  }
  const formatting = formattingIn(given.root, [{ path: named.path, body: BYTES.encode(held.body) }])
  const change = changeOf(given.root, {
    base: baseOf(given.root),
    edits: formatting.changes,
  })
  const judged = await built.gate.over(change)
  if (judged.length > 0) {
    return {
      report: [],
      refusals: [
        ...judged.map((one) => `${one.path} — ${one.reason}`),
        `nothing was resolved — the patch is as the patch was`,
      ],
      code: 3,
    }
  }
  const body = formatting.changes[0]?.body ?? BYTES.encode(held.body)
  const said = resolved(given.root, page, named.path, body)
  if ("why" in said) return { report: [], refusals: [said.why], code: 2 }
  return {
    report: [
      `resolved ${named.path}`,
      ...formattedSaid(formatting.formatted),
      ...said.clashed.map(clashSaid),
      said.patch === null
        ? "the patch was worked out to nothing and taken away"
        : `the patch is kept at ${patchAt(page)}`,
    ],
    refusals: [],
    code: 0,
  }
}

export async function applying(
  given: Given,
  page: string,
  argv: readonly string[]
): Promise<Answer> {
  const unknown = unknownIn(argv, APPLYING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const message = messageIn(argv, APPLYING)
  if ("refusals" in message) return mistaking(message.refusals)
  const glass = glassIn(argv, APPLYING)
  if ("refusals" in glass) return mistaking(glass.refusals)
  const broken = glass.glass
  if (patchIn(given.root, page) === null) return mistaking([noneSaid(given.root, page)])
  const built = gateBuilt(given.root)
  if (broken === null && !("gate" in built)) {
    return { report: [], refusals: [`the checks would not load — ${built.broken}`], code: 3 }
  }
  const gate = broken === null && "gate" in built ? built.gate : NO_GATE
  const unloaded = "gate" in built ? null : built.broken
  const said0 = message.message ?? WHY
  const bypassed = broken === null ? said0 : bypassedIn(said0, broken)
  const why = unloaded === null || broken === null ? bypassed : unloadableIn(bypassed, unloaded)
  try {
    const said = await applied(given.root, page, given.agentId, why, gate, given.writer)
    if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
    return {
      report: [
        ...said.landed.map((one) => `landed ${one}`),
        ...formattedSaid(said.formatted),
        ...(broken === null ? [] : [glassSaid(broken)]),
        said.commit === null
          ? "nothing was committed — the tree already holds what the patch asked for"
          : `committed as ${said.commit}`,
      ],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return { report: [], refusals: [`nothing was committed — ${whyOf(thrown)}`], code: 3 }
  }
}

export async function patching(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const act = argv[0]
  if (act !== undefined && !ACTS.includes(act)) {
    return mistaking([
      `\`${act}\` is no act of \`${given.calledAs}\`, which takes ${ACTS.map((one) => `\`${one}\``).join(", ")}`,
    ])
  }
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || patchAt(page) === null) return mistaking([NO_PAGE])
  const rest = argv.slice(1)
  if (act === undefined) return showing(given.root, page)
  if (act === DROP) return dropping(given.root, page)
  if (act === SHOW) return showingBody(given.root, page, rest)
  if (act === RESOLVE) return await resolving(given, page, rest, piping)
  return await applying(given, page, rest)
}

export function patch(argv: readonly string[], given: Given): Promise<Answer> {
  return patching(argv, given, inputIn)
}
