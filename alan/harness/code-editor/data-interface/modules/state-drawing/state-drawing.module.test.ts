import { expect, test } from "bun:test"
import {
  drawnFor,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-drawing/state-drawing.module.code.ts"
import { changeOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

test("a picture is filed beside the page named for what that picture draws", () => {
  expect(stateAt("domain-tree")).toBe(
    "alan/harness/code-editor/data-interface/pages/domain-tree/" +
      "domain-tree.code-editor-data-interface.state.uncommitted.json"
  )
})

test("a change no shadow can be cast over draws nothing rather than refusing", () => {
  const root = scratch.rootFor("akasha-drawing-")

  const said = drawnFor(changeOf(root, "", [], []))

  expect(said.edits).toEqual([])
})
