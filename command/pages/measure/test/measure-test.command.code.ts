import { readdirSync } from "node:fs"
import { join } from "node:path"
import {
  type Limits,
  linesOf,
  windowOf,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { test as testFile } from "akasha/code/module/properties/test.code-file-property.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  costsOf,
  readIn,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import { measureTest as page } from "akasha/command/pages/measure/test/measure-test.command.ts"

const TEST = "test"

const NAMED = /\.entries(?:\.part\d+)?\.uncommitted\.jsonl$/

const WALKED_PAST: ReadonlySet<string> = new Set(["node_modules", "dist", "target"])

const UNDER = "/"

const ROOT = ""

const ALLOWED: Limits = { cpu: testFile.maxCpuSeconds, wall: null, mem: testFile.maxMemoryMb }

function rowFilesIn(root: string): readonly string[] {
  const found: string[] = []
  const asked: string[] = [ROOT]
  while (asked.length > 0) {
    const at = asked.pop() ?? ROOT
    let held: readonly { name: string; isDirectory: () => boolean }[]
    try {
      held = readdirSync(join(root, at), { withFileTypes: true })
    } catch {
      continue
    }
    for (const one of held) {
      const path = at === ROOT ? one.name : `${at}${UNDER}${one.name}`
      if (one.isDirectory()) {
        if (!one.name.startsWith(".") && !WALKED_PAST.has(one.name)) asked.push(path)
        continue
      }
      if (NAMED.test(one.name)) found.push(path)
    }
  }
  return found.sort()
}

export function measureTest(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const gathered = readIn(given.root, rowFilesIn(given.root))
  const costs = costsOf(gathered, Date.now(), chose.chosen, (one) => one.phase === TEST, ALLOWED)
  return told([...linesOf(costs, TEST)])
}
