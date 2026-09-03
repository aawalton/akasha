import { describe, expect, test } from "bun:test"
import { SEAT_MODE_HEADLESS } from "../../seat-modes/seat-modes.module.code.ts"
import { bootPromptFor, readStartedSeat } from "./message-to-start.module.code.ts"

describe("bootPromptFor", () => {
  test("says the domain and the role the seat answers for", () => {
    const prompt = bootPromptFor("akasha-migration", "worker")
    expect(prompt).toContain("`akasha-migration`")
    expect(prompt).toContain("`worker`")
  })

  test("says where the message waiting is read", () => {
    expect(bootPromptFor("d", "r")).toContain("ops seat inbox")
  })
})

describe("readStartedSeat", () => {
  test("takes the row started headless", () => {
    const stdout = ["id-1\tabby\tinteractive", `id-2\tvera\t${SEAT_MODE_HEADLESS}`].join("\n")
    expect(readStartedSeat(stdout)).toEqual({ id: "id-2", name: "vera" })
  })

  test("finds nothing where no row was started headless", () => {
    expect(readStartedSeat("id-1\tabby\tinteractive")).toBeNull()
  })

  test("finds nothing in an empty answer", () => {
    expect(readStartedSeat("")).toBeNull()
  })

  test("passes over a headless row carrying no id", () => {
    expect(readStartedSeat(`\tabby\t${SEAT_MODE_HEADLESS}`)).toBeNull()
  })

  test("takes a headless row carrying no name", () => {
    expect(readStartedSeat(`id-2\t\t${SEAT_MODE_HEADLESS}`)).toEqual({ id: "id-2", name: "" })
  })
})
