import { describe, expect, test } from "bun:test"
import {
  frameDefaultForEngine,
  GameDisplayConfigSchema,
  resolveAlertPrefs,
  resolveGameDisplay,
} from "./game-schema.ts"

describe("display module composition (#14226) — modules + resolveGameDisplay", () => {
  test("a module composition parses with per-module options", () => {
    const display = GameDisplayConfigSchema.parse({
      modules: {
        beatLog: { systemWindows: true },
        hud: { pools: [{ key: "hp", label: "VITAE", color: "red", max: "hpMax" }] },
        sheet: {},
        storySoFar: { source: "stateLedger" },
        actionBox: {},
      },
      pollMs: 1800,
    })
    expect(display.modules?.beatLog?.systemWindows).toBe(true)
    expect(display.modules?.storySoFar?.source).toBe("stateLedger")
    expect(display.pollMs).toBe(1800)
  })

  test("an unknown module key or option fails loud (strict at every level)", () => {
    expect(GameDisplayConfigSchema.safeParse({ modules: { minimap: {} } }).success).toBe(false)
    expect(
      GameDisplayConfigSchema.safeParse({ modules: { beatLog: { minimap: true } } }).success
    ).toBe(false)
    expect(GameDisplayConfigSchema.safeParse({ modules: { storySoFar: {} } }).success).toBe(false)
    expect(
      GameDisplayConfigSchema.safeParse({ modules: { chapterProse: { minimap: true } } }).success
    ).toBe(false)
  })

  test("chapterProse opts into inline system windows (#14443)", () => {
    const display = GameDisplayConfigSchema.parse({
      modules: { chapterProse: { systemWindows: true }, actionBox: {} },
      pollMs: 1800,
    })
    expect(display.modules.chapterProse?.systemWindows).toBe(true)
    expect(
      GameDisplayConfigSchema.parse({ modules: { chapterProse: {} }, pollMs: 1800 }).modules
        .chapterProse
    ).toEqual({})
  })

  test("chapterProse declares its history scope, strict enum (#14458)", () => {
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { history: "full" }, actionBox: {} },
        pollMs: 1800,
      }).modules.chapterProse?.history
    ).toBe("full")
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { history: "session" } },
        pollMs: 1800,
      }).modules.chapterProse?.history
    ).toBe("session")
    expect(
      GameDisplayConfigSchema.parse({ modules: { chapterProse: {} }, pollMs: 1800 }).modules
        .chapterProse?.history
    ).toBeUndefined()
    expect(
      GameDisplayConfigSchema.safeParse({
        modules: { chapterProse: { history: "weekly" } },
        pollMs: 1800,
      }).success
    ).toBe(false)
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { systemWindows: true, history: "full" } },
        pollMs: 1800,
      }).modules.chapterProse
    ).toEqual({ systemWindows: true, history: "full" })
  })

  test("chapterProse declares its titles and pastTurns dials, strict enums (#14521)", () => {
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { titles: "hidden" }, actionBox: {} },
        pollMs: 1800,
      }).modules.chapterProse?.titles
    ).toBe("hidden")
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { titles: "shown" } },
        pollMs: 1800,
      }).modules.chapterProse?.titles
    ).toBe("shown")
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { pastTurns: "muted" }, actionBox: {} },
        pollMs: 1800,
      }).modules.chapterProse?.pastTurns
    ).toBe("muted")
    expect(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: { pastTurns: "plain" } },
        pollMs: 1800,
      }).modules.chapterProse?.pastTurns
    ).toBe("plain")
    const bare = GameDisplayConfigSchema.parse({
      modules: { chapterProse: {} },
      pollMs: 1800,
    }).modules.chapterProse
    expect(bare?.titles).toBeUndefined()
    expect(bare?.pastTurns).toBeUndefined()
    expect(
      GameDisplayConfigSchema.safeParse({
        modules: { chapterProse: { titles: "faded" } },
        pollMs: 1800,
      }).success
    ).toBe(false)
    expect(
      GameDisplayConfigSchema.safeParse({
        modules: { chapterProse: { pastTurns: "dim" } },
        pollMs: 1800,
      }).success
    ).toBe(false)
    expect(
      GameDisplayConfigSchema.parse({
        modules: {
          chapterProse: {
            systemWindows: true,
            history: "full",
            titles: "hidden",
            pastTurns: "muted",
          },
        },
        pollMs: 1800,
      }).modules.chapterProse
    ).toEqual({ systemWindows: true, history: "full", titles: "hidden", pastTurns: "muted" })
    expect(
      GameDisplayConfigSchema.safeParse({
        modules: { chapterProse: { titles: "hidden", minimap: true } },
        pollMs: 1800,
      }).success
    ).toBe(false)
  })

  test("modules-bearing config resolves verbatim", () => {
    const resolved = resolveGameDisplay(
      GameDisplayConfigSchema.parse({
        modules: { chapterProse: {}, storySoFar: { source: "turns" }, actionBox: {} },
        pollMs: 4000,
        tagline: "The story continues — what do you do?",
      })
    )
    expect(resolved.modules).toEqual({
      chapterProse: {},
      storySoFar: { source: "turns" },
      actionBox: {},
    })
    expect(resolved.pollMs).toBe(4000)
    expect(resolved.tagline).toBe("The story continues — what do you do?")
  })

  test("the retired legacy toggles fail loud (contract: modules + pollMs required)", () => {
    expect(GameDisplayConfigSchema.safeParse({ storyOnly: true }).success).toBe(false)
    expect(
      GameDisplayConfigSchema.safeParse({ hud: true, sheet: true, systemWindows: true }).success
    ).toBe(false)
    expect(GameDisplayConfigSchema.safeParse({}).success).toBe(false)
    expect(
      GameDisplayConfigSchema.safeParse({
        modules: { actionBox: {} },
      }).success
    ).toBe(false)
  })
})

describe("turn-arrival alerts (#14524) — displayConfig.alerts + resolveAlertPrefs", () => {
  const BASE = { modules: { chapterProse: {} }, pollMs: 4000 } as const

  test("undeclared alerts → both channels default ON", () => {
    const display = GameDisplayConfigSchema.parse(BASE)
    expect(display.alerts).toBeUndefined()
    expect(resolveAlertPrefs(display.alerts)).toEqual({ sound: "chime", desktop: true })
  })

  test('sound:"off" silences the sound channel; desktop stays default ON', () => {
    const display = GameDisplayConfigSchema.parse({ ...BASE, alerts: { sound: "off" } })
    expect(resolveAlertPrefs(display.alerts)).toEqual({ sound: "off", desktop: true })
  })

  test("desktop:false suppresses the notification; sound stays default ON", () => {
    const display = GameDisplayConfigSchema.parse({ ...BASE, alerts: { desktop: false } })
    expect(resolveAlertPrefs(display.alerts)).toEqual({ sound: "chime", desktop: false })
  })

  test("a named preset is honored", () => {
    const display = GameDisplayConfigSchema.parse({ ...BASE, alerts: { sound: "bell" } })
    expect(resolveAlertPrefs(display.alerts)).toEqual({ sound: "bell", desktop: true })
  })

  test("an unknown alerts sub-key fails loud (strict)", () => {
    expect(GameDisplayConfigSchema.safeParse({ ...BASE, alerts: { chime: true } }).success).toBe(
      false
    )
  })

  test("an unknown sound preset fails loud (enum)", () => {
    expect(
      GameDisplayConfigSchema.safeParse({ ...BASE, alerts: { sound: "airhorn" } }).success
    ).toBe(false)
  })

  test("resolveGameDisplay carries alerts through when present, omits when absent", () => {
    const withAlerts = resolveGameDisplay(
      GameDisplayConfigSchema.parse({ ...BASE, alerts: { sound: "off", desktop: false } })
    )
    expect(withAlerts.alerts).toEqual({ sound: "off", desktop: false })
    const without = resolveGameDisplay(GameDisplayConfigSchema.parse(BASE))
    expect(without.alerts).toBeUndefined()
  })
})

describe("frame config homing (#15769) — engine-keyed default", () => {
  const BASE = { modules: { chapterProse: {} }, pollMs: 4000 } as const

  test("frameDefaultForEngine: awen enables edge-to-edge + focus + new-top follow", () => {
    expect(frameDefaultForEngine("awen")).toEqual({
      edgeToEdge: true,
      focusMode: true,
      autoScroll: { loadScroll: "new-top" },
    })
  })

  test("frameDefaultForEngine: idle/chess/unknown/undefined → no frame (undefined)", () => {
    expect(frameDefaultForEngine("idle")).toBeUndefined()
    expect(frameDefaultForEngine("chess")).toBeUndefined()
    expect(frameDefaultForEngine("mystery")).toBeUndefined()
    expect(frameDefaultForEngine(undefined)).toBeUndefined()
  })

  test("resolveGameDisplay fills frame from the engine default for awen", () => {
    const resolved = resolveGameDisplay(GameDisplayConfigSchema.parse(BASE), "awen")
    expect(resolved.frame).toEqual({
      edgeToEdge: true,
      focusMode: true,
      autoScroll: { loadScroll: "new-top" },
    })
  })

  test("resolveGameDisplay omits frame for a non-awen engine and when no engine is given", () => {
    expect(resolveGameDisplay(GameDisplayConfigSchema.parse(BASE), "idle").frame).toBeUndefined()
    expect(resolveGameDisplay(GameDisplayConfigSchema.parse(BASE)).frame).toBeUndefined()
  })
})
