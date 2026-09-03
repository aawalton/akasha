import { describe, expect, test } from "bun:test"
import type { ImessageMessage } from "../chat-db/chat-db.module.code.ts"
import { buildNameIndex, handleKey } from "../contacts-db/contacts-db.module.code.ts"
import { messageLabel, nameFor, singleLine } from "./message-lines.module.code.ts"

const CONTACTS = [{ name: "Alan", phones: ["+1 555 010 2030"], emails: ["alan@example.com"] }]

function message(over: Partial<ImessageMessage>): ImessageMessage {
  return {
    rowid: 1,
    guid: "g",
    text: "hi",
    isFromMe: false,
    unixSeconds: 0,
    handleId: null,
    chatIdentifier: null,
    chatDisplayName: null,
    ...over,
  }
}

describe("nameFor", () => {
  const name = nameFor({ buildNameIndex, handleKey }, CONTACTS)

  test("finds a contact through a differently spelled handle", () => {
    expect(name("5550102030")).toBe("Alan")
    expect(name("ALAN@example.com")).toBe("Alan")
  })

  test("answers null where no contact holds the handle", () => {
    expect(name("+1 555 999 8888")).toBe(null)
  })
})

describe("messageLabel", () => {
  const name = nameFor({ buildNameIndex, handleKey }, CONTACTS)

  test("names the contact behind the handle", () => {
    expect(messageLabel(message({ handleId: "5550102030" }), name)).toBe("Alan")
  })

  test("falls back to the handle itself", () => {
    expect(messageLabel(message({ handleId: "+15559998888" }), name)).toBe("+15559998888")
  })

  test("reads unknown where neither handle nor chat is there", () => {
    expect(messageLabel(message({}), name)).toBe("unknown")
  })

  test("puts a chat's display name before the sender", () => {
    expect(
      messageLabel(message({ handleId: "5550102030", chatDisplayName: "Kitchen" }), name)
    ).toBe("Kitchen: Alan")
  })
})

describe("singleLine", () => {
  test("folds tabs and line breaks so a row stays one line", () => {
    expect(singleLine("a\tb")).toBe("a b")
    expect(singleLine("a\nb")).toBe("a ⏎ b")
    expect(singleLine("a  \n  b")).toBe("a ⏎ b")
  })
})
