export const summary = "Read a file, and after the first time only what changed"

import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs"
import { discarded } from "../../../agent/discarded.ts"
import { ANSWER_CEILING, costOf, restCall } from "../../../agent/read-answer.ts"
import { readOne } from "../../../agent/read-one.ts"
import { agentPageFor, readRecordFor, replacedAt } from "../../../agent/read-record.ts"
import { recordRead } from "../../../agent/record-read.ts"
import { writerId } from "../../../agent/writer.ts"
import { canonicalize } from "../../../repo/path/path.ts"
import { conditionalBelow, conditionalCaption, conditionalText } from "./conditional.ts"
import { doubleRun } from "./double-run.ts"
import { requiredFor } from "./required.ts"
import { seatTargets } from "./seat.ts"
import { type Target, targetOf } from "./target.ts"

const SCRATCH = "/var/tmp"

const FILE_PATH = "--file-path"

const FULL = "--full"

const SEAT = "--seat"

interface Args {
  readonly paths: readonly string[]
  readonly full: boolean
  readonly seat: boolean
}

function parseArgs(argv: readonly string[]): Args {
  const paths: string[] = []
  let full = false
  let seat = false
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i] ?? ""
    if (arg === FILE_PATH) {
      const value = argv[i + 1]
      if (value === undefined) throw new Error(`${arg} needs a value`)
      paths.push(value)
      i += 1
      continue
    }
    if (arg === FULL) {
      full = true
      continue
    }
    if (arg === SEAT) {
      seat = true
      continue
    }
    if (arg === "--repo") {
      throw new Error(
        `this reads each ${FILE_PATH} from whichever repository holds it, so it takes no --repo — ` +
          "name a file outside the working directory's repository by its absolute path"
      )
    }
    throw new Error(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  if (seat && paths.length > 0) {
    throw new Error(
      `${SEAT} is the whole set this seat is required to have read, so it takes no ${FILE_PATH} beside it`
    )
  }
  if (paths.length === 0 && !seat)
    throw new Error(`${FILE_PATH} names a file to read, and none was given`)
  return { paths, full, seat }
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "The whole file the first time you read it; one line saying so and nothing else where it has not " +
    "moved since; and the difference from what you last read to what is on disk where it has. Reading " +
    "through this command records the read the akasha checks ask for, so a change made straight " +
    "afterwards is admitted with no `Read` call in between.\n" +
    "\n" +
    "WHAT THE RECORD SAYS IS THAT THE BODY REACHED YOU, so a read whose output is being thrown away is " +
    "REFUSED: one line on stderr, no body behind it, and nothing recorded. `>/dev/null`, a PIPE and a " +
    "REDIRECT INTO A FILE are all caught: a pipe hands back part of the file while a record would claim " +
    "the whole of it, and a redirect hands back nothing at all. What separates a redirect from the file " +
    "this harness gives each command it runs is that the errors of the same run go somewhere else. Run " +
    "it again with the output reaching you.\n" +
    "\n" +
    "WHERE WHAT YOU LAST SAW CANNOT BE ESTABLISHED you get the whole file and a line saying why — an " +
    "entry written before this command existed, a body that never reached a commit, a first read that " +
    "covered only part of the file. A difference against the wrong base would tell you that you are " +
    "current when you are not, and nothing downstream would catch it.\n" +
    "\n" +
    "WHAT IS REQUIRED FOR WHAT YOU ASKED FOR COMES WITH IT. After your own files, under one line saying " +
    "why they are there, comes what each path warrants — the same set a write is refused for not having " +
    "read, worked out by the same code that refuses it, in front of you before the draft rather than " +
    "after it. They are read exactly as your own files are, so one you already hold costs a line. A file " +
    "that does not exist cannot be read, so a write CREATING one is still refused until you have read " +
    "what is required for it.\n" +
    "\n" +
    `WHAT THIS SEAT IS BOUND TO IS NAMED IN ONE CALL. \`${SEAT}\` takes no path: it names every document ` +
    "the seat's persona, domain, role, task and initiative bind it to, in whichever repository each " +
    "stands, answered from the record exactly as a named path is — whole the first time, one line where " +
    "it has not moved, and the difference where it has. A seat owing one document pays for one and not " +
    `for the set. Where a context was lost while the record stands, \`${FULL}\` returns the bodies. ` +
    "Under those come the DEFINITIONS of what those documents name as " +
    "`conditional-reading-slugs:`, each one line: enough to judge which bears on the work, and not the " +
    "body, which you read by its path when it does.\n" +
    "\n" +
    "WHAT ONE ANSWER CARRIES BOUNDS WHAT COMES BACK, and no file is broken off partway to fit. Files go " +
    `out whole, in the order above, until the next one would carry the answer past ${ANSWER_CEILING} ` +
    "characters, which is the ceiling this prints to. What is left is neither read nor recorded, and the " +
    "last line is the call that takes it, ready to run. A FILE WHOSE OWN BODY IS PAST THE CEILING is " +
    "REFUSED rather than printed: no call returns it, a read taking no line range, and printing it " +
    "anyway hands the harness a body it spills to a file while the record claims it reached you.\n" +
    "\n" +
    "WHICH AGENT IS ASKING IS ANSWERED, a subagent included. A hook exports the delegate's own record " +
    "into the command of a Bash call raised inside one, so what a delegate reads lands in its record " +
    `rather than its seat's, and neither authorises the other's write. \`${FULL}\` is the way past a ` +
    "context that lost the body while the record stands.\n" +
    "\n" +
    "A RELATIVE PATH IS TAKEN AGAINST THE DIRECTORY THE COMMAND RAN IN and an ABSOLUTE one against " +
    "whichever repository holds it, so one call reads files in several — which is how a refused command " +
    "can name a single call for everything it owes. The line numbers on a whole-file read are not part " +
    "of the file. A difference carries one line of context either side, because a line in these " +
    "documents is usually a whole paragraph, and it is sent only where it is SMALLER than the file it " +
    "describes; where a rewrite made it bigger you get the file.",
  flags: [
    {
      name: FILE_PATH,
      argLabel: "<path>",
      valueShape: "token" as const,
      path: true,
      repeatable: true,
      description:
        "A file: relative to the directory this ran in, or absolute and inside any repository. " +
        "Required unless `--seat`, and repeatable.",
    },
    {
      name: FULL,
      description: "The whole file for each path you name, whatever the record says.",
    },
    {
      name: SEAT,
      description: `Every document this seat is bound to, as the record leaves it; takes no ${FILE_PATH} beside it.`,
    },
  ],
}

export default async function read(argv: readonly string[]): Promise<void> {
  const thrownAway = discarded()
  if (thrownAway !== null) {
    process.stderr.write(
      `refused: nothing was read — this is printing to ${thrownAway}, so no body would reach you ` +
        "and a record would have said one had. Run it again with the output reaching you.\n"
    )
    process.exitCode = 1
    return
  }
  const args = parseArgs(argv)
  const from = canonicalize(process.cwd())
  const agent = writerId()

  if (args.seat && agent === null) {
    throw new Error(
      `${SEAT} reads what THIS seat is required to have read, and nothing identifies which seat this ` +
        "is — neither AGENT_ID nor CLAUDE_CODE_SESSION_ID is set"
    )
  }
  const bound = args.seat ? seatTargets(agent as string, from) : null
  if (args.seat && bound === null) {
    throw new Error(
      "no page stands for this seat, so nothing says what it is bound to — " +
        "`ops seat set` is what records what a seat is"
    )
  }
  if (bound !== null && bound.length === 0) {
    throw new Error(
      "this seat states no attributes, so nothing is required reading for it — " +
        "`ops seat set` is what records what a seat is"
    )
  }
  const full = args.full

  const declared: readonly Target[] = bound ?? args.paths.map((one) => targetOf(one, from))
  const asked = new Set<string>()
  const targets = declared.map((target) => {
    if (asked.has(target.absolute)) throw new Error(`${target.named} is named more than once`)
    asked.add(target.absolute)
    return target
  })
  const required = args.seat
    ? { targets: [] as readonly Target[], caption: "" }
    : requiredFor(targets, from)

  const report: string[] = []
  const refusals: string[] = []
  let spent = 0
  const say = (...lines: readonly string[]): void => {
    for (const line of lines) report.push(line)
    spent += costOf(lines)
  }
  if (agent === null) {
    say(
      "read:   nothing identifies who is reading — neither AGENT_ID nor CLAUDE_CODE_SESSION_ID " +
        "is set, so no read here can be attributed to you and the change you make next is refused for it"
    )
  }
  const page = agent === null ? null : agentPageFor(agent)
  const cutoff = page === null ? 0 : replacedAt(page)
  const log = agent === null ? null : readRecordFor(agent)
  if (agent !== null && page === null) {
    say(
      `read:   no agent page stands for \`${agent}\`, so nothing read here can be recorded against ` +
        "you and the change you make next is refused for it"
    )
  }
  const oldSeen = new Map<string, string>()
  const workspace = mkdtempSync(`${SCRATCH}/akasha-read-`)
  const queue = [...targets, ...required.targets]
  const conditional = args.seat ? conditionalBelow(queue, from) : []
  const definitions =
    conditional.length === 0
      ? []
      : [conditionalCaption(conditional.length), ...conditional.map(conditionalText)]
  const kept = costOf(definitions)
  let taken = 0
  let left: readonly Target[] = []
  try {
    for (const [order, target] of queue.entries()) {
      const opening: string[] = []
      if (required.targets.length > 0 && order === targets.length) opening.push(required.caption)
      const { named, absolute } = target
      if (!existsSync(absolute) || !statSync(absolute).isFile()) {
        say(...opening)
        refusals.push(`${named} names no file — this reads one that is there`)
        continue
      }
      const canonical = canonicalize(absolute)
      const forced = args.full && asked.has(absolute)
      const reading = log === null || forced ? null : log.reading(canonical)
      const emission = readOne({ named, absolute, reading, forced, root: target.root, workspace })
      const lines = [
        ...opening,
        `read:   ${emission.headline}`,
        ...(emission.body === null ? [] : [emission.body]),
      ]
      const cost = costOf(lines)
      if (cost > ANSWER_CEILING) {
        say(...opening)
        refusals.push(
          `${named} — its ${cost} characters are past the ${ANSWER_CEILING} one answer holds, so the ` +
            `body would reach nobody and nothing is recorded of it. A read takes no line range, so no ` +
            `call returns it: an authored file is split before it is changed`
        )
        continue
      }
      const rest = queue.slice(order + 1)
      if (taken > 0 && spent + cost + kept + costOf(restCall(rest, full)) > ANSWER_CEILING) {
        left = queue.slice(order)
        break
      }
      say(...lines)
      taken += 1
      const settled = emission.record?.oid ?? reading?.oid
      if (settled !== undefined) oldSeen.set(canonical, settled)
      if (page !== null && emission.record !== null) {
        recordRead(page, cutoff, canonical, emission.record.seenAt, emission.record.oid)
      }
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
  say(...definitions)
  say(...restCall(left, full))
  if (report.length > 0) process.stdout.write(`${report.join("\n")}\n`)
  doubleRun(argv, agent, oldSeen)
  if (refusals.length === 0) return
  process.stderr.write(`refused:\n${refusals.map((one) => `  ${one}`).join("\n")}\n`)
  process.exitCode = 1
}
