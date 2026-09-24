import { realpathSync } from "node:fs"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const HERE = "swift-parses-"

export const ONE = "akasha/one/one.ios-component.swift.swift"

export const CLEAN =
  "import SwiftUI\nimport WidgetKit\n\nstruct One: View {\n" +
  '  var body: some View {\n    Text("held").padding(3)\n  }\n}\n'

export const BROKEN =
  'import SwiftUI\n\nstruct One: View {\n  var body: some View {\n    Text("held"\n  }\n}\n'

export const BROKEN_LINE = 5

export const UNCLOSED = "expected ')' to end function call"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = realpathSync(scratch.rootFor(HERE))
  nothingFiled(root)
  return root
}
