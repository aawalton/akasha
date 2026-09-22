import { expect, test } from "bun:test"
import {
  type DependentSourceFile,
  enumerateGlobalDependents,
} from "akasha/temper/addon/build/modules/global-name-dependents/global-name-dependents.module.code.ts"

function markup(source: string): readonly DependentSourceFile[] {
  return [{ path: "addon/metadata/Layout.xml", source, lang: "xml" }]
}

test("a control the markup names is a dependent of that name", () => {
  const report = enumerateGlobalDependents({
    global: "USPF_GUI",
    files: markup('<GuiXml>\n\t<Controls>\n\t\t<TopLevelControl name="USPF_GUI" />\n'),
  })

  expect(report.verdict).toBe("keep-name-required")
  expect(report.dependents.map((one) => one.kind)).toEqual(["xml-control-name"])
  expect(report.dependents[0]?.line).toBe(3)
})

test("a template a control inherits is a dependent of that name", () => {
  const report = enumerateGlobalDependents({
    global: "USPF_TooltipTarget",
    files: markup(
      '<Control name="TemperCharactersRow" inherits="ZO_ComboBox USPF_TooltipTarget" />'
    ),
  })

  expect(report.verdict).toBe("keep-name-required")
  expect(report.dependents.map((one) => one.kind)).toEqual(["xml-inherits-ref"])
  expect(report.dependents[0]?.detail).toBe('inherits="ZO_ComboBox USPF_TooltipTarget"')
})

test("a control an anchor is placed against is a dependent of that name", () => {
  const report = enumerateGlobalDependents({
    global: "ItemBrowserFrame",
    files: markup('<Anchor point="TOPLEFT" relativeTo="ItemBrowserFrame" />'),
  })

  expect(report.verdict).toBe("keep-name-required")
  expect(report.dependents.map((one) => one.kind)).toEqual(["xml-anchor-ref"])
})

test("a name a longer name starts with is no dependent of that longer name", () => {
  const report = enumerateGlobalDependents({
    global: "USPF_GUI",
    files: markup('<Backdrop name="USPF_GUI_BG" relativeTo="USPF_GUI_Header" />'),
  })

  expect(report.verdict).toBe("rename-safe")
  expect(report.dependents).toEqual([])
})

test("a name in a markup comment is no dependent", () => {
  const report = enumerateGlobalDependents({
    global: "ShifterBoxTemplate",
    files: markup('<!-- <Control name="ShifterBoxTemplate" /> -->'),
  })

  expect(report.verdict).toBe("rename-safe")
})
