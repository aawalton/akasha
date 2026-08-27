import { expect, test } from "bun:test"
import { requireMatch } from "../../../../shared/utils-narrow/src/require-match"
import { z } from "zod"
import synth, { NAMESPACE_NAMES } from "./synth.ts"

const NAME_LINE = /^ {2}name: (?<name>\S+)$/m
const NAME_GROUPS = z.object({ name: z.string().min(1) })

const emittedNames = (): readonly string[] =>
  synth()
    .flatMap((one) => one.yaml.split(/^---$/m))
    .filter((doc) => doc.trim() !== "")
    .map((doc) => requireMatch(NAME_LINE, NAME_GROUPS, doc, "an emitted Namespace document").name)

test("the synth emits one Namespace for each name NAMESPACE_NAMES lists", () => {
  expect([...emittedNames()].sort()).toEqual([...NAMESPACE_NAMES].sort())
})
