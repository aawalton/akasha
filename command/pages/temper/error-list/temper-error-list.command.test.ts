import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperErrorList } from "akasha/command/pages/temper/error-list/temper-error-list.command.code.ts"

const SAYS = "is no whole number of nought or more"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper error-list",
  from: ".",
  writer: null,
  agentId: null,
}

test("a stale window that is no number at all is refused before a capture is read", async () => {
  const said = await temperErrorList(["--stale-after-hours", "abc"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
  expect(said.refusals.join("\n")).toContain("abc")
})

test("a stale window carrying a fraction is refused rather than rounded", async () => {
  const said = await temperErrorList(["--stale-after-hours", "1.5"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})

test("a stale window under nought is refused rather than read as a window", async () => {
  const said = await temperErrorList(["--stale-after-hours", "-3"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})

test("a flag this takes no argument for is refused before a capture is read", async () => {
  const said = await temperErrorList(["--outdated"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})

const SEEN_AT = 1767225600

const CAPTURE = `TemperErrors_SavedVariables =
{
    ["Default"] =
    {
        ["@Someone"] =
        {
            ["$AccountWide"] =
            {
                ["version"] = 1,
                ["entries"] =
                {
                    [1] =
                    {
                        ["message"] = "user:/AddOns/TemperItems/TemperItems.lua:9: unexpected nil value",
                        ["traceback"] = "stack traceback:\\nuser:/AddOns/TemperItems/TemperItems.lua:9: in function 'f'",
                        ["lastSeenAt"] = ${String(SEEN_AT)},
                        ["firstSeenAt"] = ${String(SEEN_AT)},
                        ["character"] = "Someone",
                        ["account"] = "@Someone",
                        ["count"] = 1,
                        ["esoVersion"] = "eso.live",
                        ["apiVersion"] = 101050,
                        ["world"] = "NA Megaserver",
                        ["eventCode"] = 65543,
                    },
                },
            },
        },
    },
}
`

test("an error at the frontier is live though its addon was committed to after it", async () => {
  const errorsPath = join(mkdtempSync(join("/var/tmp", "temper-error-list-test-")), "Temper.lua")
  writeFileSync(errorsPath, CAPTURE)

  const said = await temperErrorList(["--errors-path", errorsPath], GIVEN)

  expect(said.report.join("\n")).toContain("TemperItems.lua:9: unexpected nil value")
  expect(said.report.join("\n")).not.toContain("stale entry left out")
})

test("the stale window said twice is refused rather than read as the first saying", async () => {
  const said = await temperErrorList(
    ["--stale-after-hours", "4", "--stale-after-hours", "8"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--stale-after-hours` is said twice")
})
