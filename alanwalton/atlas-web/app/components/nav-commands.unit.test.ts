import { describe, expect, it } from "bun:test"
import { internalNavCommands } from "./nav-commands"

describe("internalNavCommands — v1 palette command set", () => {
  it("projects the internal primaryNavItems (Home, Search, Map), single-sourced from nav-items", () => {
    const commands = internalNavCommands()

    expect(commands.find((c) => c.id === "home")).toEqual({ id: "home", label: "Home", href: "/" })
    expect(commands.find((c) => c.id === "search")).toEqual({
      id: "search",
      label: "Search",
      href: "/search",
    })
    expect(commands.find((c) => c.id === "map")).toEqual({ id: "map", label: "Map", href: "/map" })
    expect(commands).toHaveLength(3)
  })

  it("keeps only in-app destinations (a nav palette never jumps out of the app)", () => {
    const commands = internalNavCommands()

    for (const command of commands) {
      expect(command.href.startsWith("/")).toBe(true)
    }
  })
})
