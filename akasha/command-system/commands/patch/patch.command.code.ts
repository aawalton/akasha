import { dropPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import { agentPathOf } from "@akasha/context-system/warranting"
import { said as gitSaid } from "@akasha/git/git-running"
import { applied } from "../../applying/applying.module.code.ts"
import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { rebasedOnto } from "../../drafting/drafting.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"
import { gateBuilt } from "../../gate-building/gate-building.module.code.ts"
import {
  added,
  type Blobs,
  blobsIn,
  deleted,
  dropBlobs,
} from "../../patching/patching.module.code.ts"
import { MESSAGE, MESSAGE_FILE, messageIn, unknownIn } from "../write/write.command.code.ts"

export const APPLY = "apply"

export const DROP = "drop"

const VALUED = [MESSAGE, MESSAGE_FILE]

const BARE: readonly string[] = []

const NONE = "nothing is drafted here, so no patch is kept"

const NO_PAGE = "this call names no agent whose page a patch would be kept beside"

const WHY = "the patch this agent drafted"

function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function markOf(one: Blobs): string {
  if (added(one)) return "added"
  if (deleted(one)) return "taken away"
  return "changed"
}

function clashSaid(path: string): string {
  return `${path} carries a conflict — resolve it in the patch before the patch applies`
}

export function showing(root: string, page: string): Answer {
  const held = patchIn(root, page)
  if (held === null) return { report: [NONE], refusals: [], code: 0 }
  const said = rebasedOnto(root, headOf(root), held)
  const moved = "why" in said ? [] : said.moved
  const clashed = "why" in said ? [] : said.clashed
  const lines = [...blobsIn(held)].map((one) => {
    const [path, blobs] = one
    const after = moved.includes(path) ? " — moved under the patch since it was drafted" : ""
    return `${markOf(blobs)} ${path}${after}`
  })
  const tail =
    "why" in said ? [`the patch does not rebase onto the commit at HEAD — ${said.why}`] : []
  return {
    report: [
      ...[...lines].sort(),
      ...clashed.map(clashSaid),
      `the patch is kept at ${patchAt(page)}`,
      ...tail,
    ],
    refusals: [],
    code: 0,
  }
}

export function dropping(root: string, page: string): Answer {
  const at = patchAt(page)
  if (at === null || patchIn(root, page) === null) {
    return { report: [NONE], refusals: [], code: 0 }
  }
  dropPatch(root, page)
  dropBlobs(root, at)
  return { report: [`the patch kept at ${at} is taken away`], refusals: [], code: 0 }
}

export function applying(given: Given, page: string, argv: readonly string[]): Answer {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return mistaking(message.refusals)
  if (patchIn(given.root, page) === null) return mistaking([NONE])
  const built = gateBuilt(given.root)
  if (!("gate" in built)) {
    return { report: [], refusals: [`the checks would not load — ${built.broken}`], code: 3 }
  }
  const why = message.message ?? WHY
  try {
    const said = applied(given.root, page, given.agentId, why, built.gate, given.writer)
    if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
    return {
      report: [
        ...said.landed.map((one) => `landed ${one}`),
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

export function patch(argv: readonly string[], given: Given): Answer {
  const act = argv[0]
  if (act !== undefined && act !== APPLY && act !== DROP) {
    return mistaking([
      `\`${act}\` is no act of \`${given.calledAs}\`, which takes \`${APPLY}\` or \`${DROP}\``,
    ])
  }
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || patchAt(page) === null) return mistaking([NO_PAGE])
  if (act === undefined) return showing(given.root, page)
  if (act === DROP) return dropping(given.root, page)
  return applying(given, page, argv.slice(1))
}
