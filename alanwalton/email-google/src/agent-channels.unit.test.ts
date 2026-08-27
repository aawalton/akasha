import { describe, expect, it } from "bun:test"
import { type AgentChannelRow, projectAgentChannels } from "./agent-channels"

describe("projectAgentChannels", () => {
  it("projects a persona row to a {lowercased address → slug} entry", () => {
    const rows: readonly AgentChannelRow[] = [{ slug: "amy", emailAddress: "amy@alanwalton.com" }]
    const map = projectAgentChannels(rows)
    expect(map.get("amy@alanwalton.com")).toBe("amy")
    expect(map.size).toBe(1)
  })

  it("lowercases and trims the address key", () => {
    const rows: readonly AgentChannelRow[] = [
      { slug: "amy", emailAddress: "  AMY@AlanWalton.com  " },
    ]
    const map = projectAgentChannels(rows)
    expect(map.get("amy@alanwalton.com")).toBe("amy")
  })

  it("keeps each persona's own address (per-persona channels)", () => {
    const rows: readonly AgentChannelRow[] = [
      { slug: "amy", emailAddress: "amy@alanwalton.com" },
      { slug: "bob", emailAddress: "bob@alanwalton.com" },
    ]
    const map = projectAgentChannels(rows)
    expect(map.get("amy@alanwalton.com")).toBe("amy")
    expect(map.get("bob@alanwalton.com")).toBe("bob")
    expect(map.size).toBe(2)
  })

  it("skips a row with no emailAddress (a persona without a channel)", () => {
    const rows: readonly AgentChannelRow[] = [
      { slug: "amy", emailAddress: "amy@alanwalton.com" },
      { slug: "dalla" },
    ]
    const map = projectAgentChannels(rows)
    expect(map.size).toBe(1)
    expect(map.get("amy@alanwalton.com")).toBe("amy")
  })

  it("skips a row with an empty-after-trim emailAddress", () => {
    const rows: readonly AgentChannelRow[] = [{ slug: "amy", emailAddress: "   " }]
    expect(projectAgentChannels(rows).size).toBe(0)
  })

  it("skips a row with no slug (no wake target)", () => {
    const rows: readonly AgentChannelRow[] = [{ emailAddress: "orphan@alanwalton.com" }]
    expect(projectAgentChannels(rows).size).toBe(0)
  })

  it("returns an empty map for no rows", () => {
    expect(projectAgentChannels([]).size).toBe(0)
  })
})
