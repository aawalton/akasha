import { describe, expect, test } from "bun:test"
import { camelised } from "akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts"

describe("the spelling a value takes on its way into akasha", () => {
  test("every key becomes camel, whichever way the caller spelled it", () => {
    expect(camelised({ "inbox-tasks": 22, id: "x", inboxTexts: 4 })).toEqual({
      inboxTasks: 22,
      id: "x",
      inboxTexts: 4,
    })
  })

  test("nothing carries a value the caller did not state", () => {
    expect(camelised({ id: "x", title: null, date: undefined })).toEqual({ id: "x" })
  })
})
