import { describe, expect, it } from "bun:test"
import { matchAgentChannel } from "./recipients"

const channels: ReadonlyMap<string, string> = new Map([
  ["amy@alanwalton.com", "amy"],
  ["bob@alanwalton.com", "bob"],
])

describe("matchAgentChannel", () => {
  it("returns the handle for a bare channel address in the To header", () => {
    expect(matchAgentChannel(channels, "amy@alanwalton.com", undefined)).toBe("amy")
  })

  it("returns the handle for the display-name form (Name <addr>)", () => {
    expect(matchAgentChannel(channels, "Amy <amy@alanwalton.com>", undefined)).toBe("amy")
  })

  it("matches case-insensitively", () => {
    expect(matchAgentChannel(channels, "AMY@AlanWalton.com", undefined)).toBe("amy")
  })

  it("routes per-persona — bob@ matches bob, not amy", () => {
    expect(matchAgentChannel(channels, "Bob <bob@alanwalton.com>", undefined)).toBe("bob")
  })

  it("returns the handle when the address appears among multiple recipients", () => {
    expect(matchAgentChannel(channels, "someone@example.com, amy@alanwalton.com", undefined)).toBe(
      "amy"
    )
  })

  it("matches when the channel address is in the Cc header", () => {
    expect(matchAgentChannel(channels, "alan@x.com", "amy@alanwalton.com")).toBe("amy")
  })

  it("returns undefined for ordinary recipients (no channel match)", () => {
    expect(matchAgentChannel(channels, "aawalton@gmail.com", "boss@work.com")).toBeUndefined()
  })

  it("returns undefined for all-empty / undefined headers", () => {
    expect(matchAgentChannel(channels, undefined, undefined)).toBeUndefined()
    expect(matchAgentChannel(channels, "", "")).toBeUndefined()
  })

  it("returns undefined against an empty channel map", () => {
    expect(matchAgentChannel(new Map(), "amy@alanwalton.com", undefined)).toBeUndefined()
  })
})
