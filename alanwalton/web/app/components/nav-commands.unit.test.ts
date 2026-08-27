import { describe, expect, it } from "bun:test"
import { internalNavCommands } from "./nav-commands"

describe("internalNavCommands — v1 palette command set", () => {
  it("projects the fixed Home route plus the internal sidebar-section children, single-sourced from nav-items", () => {
    const commands = internalNavCommands()

    expect(commands.find((c) => c.id === "home")).toEqual({
      id: "home",
      label: "Home",
      href: "/home",
    })
    expect(commands.find((c) => c.id === "idle")).toEqual({
      id: "idle",
      label: "Idle",
      href: "/idle",
    })
    expect(commands.find((c) => c.id === "principles")).toEqual({
      id: "principles",
      label: "Principles",
      href: "/principles",
    })
    expect(commands.find((c) => c.id === "design-system")).toEqual({
      id: "design-system",
      label: "Design System",
      href: "/design",
    })
    expect(commands).toHaveLength(4)
  })

  it("excludes every external destination (a nav palette never jumps out of the app)", () => {
    const commands = internalNavCommands()

    for (const externalId of ["temper", "tower", "grafana", "supabase"]) {
      expect(commands.some((c) => c.id === externalId)).toBe(false)
    }
    for (const command of commands) {
      expect(command.href.startsWith("/")).toBe(true)
    }
  })
})
