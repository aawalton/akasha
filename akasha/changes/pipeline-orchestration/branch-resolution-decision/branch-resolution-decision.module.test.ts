import { expect, test } from "bun:test"
import { decideBranchResolution } from "./branch-resolution-decision.module.code.ts"

test("a pipeline that stalled on nothing is not answered elsewhere", () => {
  expect(
    decideBranchResolution({ pipelineSeq: 4, failedWorkflowNames: [], witnesses: [] })
  ).toEqual({ answeredElsewhere: false, unwitnessed: [] })
})

test("every failure witnessed passing later answers the pipeline elsewhere", () => {
  expect(
    decideBranchResolution({
      pipelineSeq: 4,
      failedWorkflowNames: ["checks", "build"],
      witnesses: [
        { workflowName: "checks", pipelineSeq: 5 },
        { workflowName: "build", pipelineSeq: 7 },
      ],
    })
  ).toEqual({ answeredElsewhere: true, unwitnessed: [] })
})

test("a failure left unwitnessed keeps the pipeline unanswered and is named", () => {
  expect(
    decideBranchResolution({
      pipelineSeq: 4,
      failedWorkflowNames: ["checks", "build"],
      witnesses: [{ workflowName: "checks", pipelineSeq: 5 }],
    })
  ).toEqual({ answeredElsewhere: false, unwitnessed: ["build"] })
})

test("a witness on an earlier pipeline does not count", () => {
  expect(
    decideBranchResolution({
      pipelineSeq: 4,
      failedWorkflowNames: ["checks"],
      witnesses: [{ workflowName: "checks", pipelineSeq: 3 }],
    })
  ).toEqual({ answeredElsewhere: false, unwitnessed: ["checks"] })
})

test("a witness on the pipeline being answered does not count", () => {
  expect(
    decideBranchResolution({
      pipelineSeq: 4,
      failedWorkflowNames: ["checks"],
      witnesses: [{ workflowName: "checks", pipelineSeq: 4 }],
    })
  ).toEqual({ answeredElsewhere: false, unwitnessed: ["checks"] })
})

test("a workflow named twice among the failures is answered once", () => {
  expect(
    decideBranchResolution({
      pipelineSeq: 4,
      failedWorkflowNames: ["checks", "checks"],
      witnesses: [],
    })
  ).toEqual({ answeredElsewhere: false, unwitnessed: ["checks"] })
})
