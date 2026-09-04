import { expect, test } from "bun:test"
import { pipelineNotFoundMessage, pipelineSubjectOf } from "./pipeline-subject.module.code.ts"

test("a pipeline is named by its seq, its branch and its commit where it holds them", () => {
  expect(pipelineSubjectOf({ seq: 7, branch: "main", commit: "abc1234" })).toBe(
    "pipeline #7 (main @ abc1234)"
  )
})

test("a branch standing alone is named alone", () => {
  expect(pipelineSubjectOf({ seq: 7, branch: "main" })).toBe("pipeline #7 (main)")
})

test("a commit standing alone is named alone", () => {
  expect(pipelineSubjectOf({ seq: 7, commit: "abc1234" })).toBe("pipeline #7 (@ abc1234)")
})

test('a row holding no seq is named "pipeline" alone', () => {
  expect(pipelineSubjectOf({})).toBe("pipeline")
})

test("a value of the wrong kind is passed over rather than written out", () => {
  expect(pipelineSubjectOf({ seq: "7", branch: 3 })).toBe("pipeline")
})

test("a seq that found no pipeline is answered with why the number names nothing", () => {
  const said = pipelineNotFoundMessage(7)
  expect(said).toContain("pipeline #7 not found")
  expect(said).toContain("seq is allocated per page type")
})
