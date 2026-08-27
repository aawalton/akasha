import { describe, expect, it } from "bun:test"
import { internalNavCommands } from "./nav-commands"

describe("internalNavCommands — v1 palette command set", () => {
  it("projects the internal primaryNavItems (Home today), single-sourced from nav-items", () => {
    const commands = internalNavCommands()

    expect(commands.find((c) => c.id === "home")).toEqual({
      id: "home",
      label: "Home",
      href: "/",
    })
    expect(commands).toHaveLength(1)
  })

  it("keeps only in-app destinations (a nav palette never jumps out of the app)", () => {
    const commands = internalNavCommands()

    for (const command of commands) {
      expect(command.href.startsWith("/")).toBe(true)
    }
  })
})
