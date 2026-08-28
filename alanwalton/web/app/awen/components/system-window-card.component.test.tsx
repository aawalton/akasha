import { afterEach, describe, expect, test } from "bun:test"
import type { SystemWindow } from "@alanwalton/awen-core/system-window-schema"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { SystemWindowCard } from "./system-window-card"

afterEach(() => {
  cleanup()
})

function renderWindow(window: SystemWindow) {
  render(
    <SurfaceProvider level={0}>
      <SystemWindowCard window={window} />
    </SurfaceProvider>
  )
}

function renderInteractive(window: SystemWindow, userId: string | null) {
  render(
    <UserIdContext.Provider value={userId}>
      <SurfaceProvider level={0}>
        <SystemWindowCard window={window} gameExternalId="game-1" windowId="w1" />
      </SurfaceProvider>
    </UserIdContext.Provider>
  )
}

const CHOICE_WINDOW: Extract<SystemWindow, { type: "system-choice" }> = {
  type: "system-choice",
  choice: {
    id: "perk-1",
    title: "Choose a perk",
    prompt: "Bind one talent to your companion.",
    options: [
      { id: "ironhide", label: "Ironhide", detail: "+2 armor" },
      { id: "swiftness", label: "Swiftness" },
    ],
  },
}

describe("SystemWindowCard", () => {
  test("quest-added renders the added banner + title/objective/reward", () => {
    renderWindow({
      type: "quest-added",
      quest: {
        title: "Ascend the Hotel",
        objective: "Reach the third floor",
        reward: "+1 Stamina",
      },
    })
    expect(screen.getByText("Quest Added")).toBeDefined()
    expect(screen.getByText("Ascend the Hotel")).toBeDefined()
    expect(screen.getByText("Reach the third floor")).toBeDefined()
    expect(screen.getByText("+1 Stamina")).toBeDefined()
  })

  test("quest-complete renders the completion banner", () => {
    renderWindow({
      type: "quest-complete",
      quest: { title: "Ascend the Hotel", objective: "Reach the third floor" },
    })
    expect(screen.getByText("Quest Complete")).toBeDefined()
    expect(screen.getByText("Ascend the Hotel")).toBeDefined()
  })

  test("item-award renders the acquired banner + item name and labeled descriptors", () => {
    renderWindow({
      type: "item-award",
      award: {
        item: "Cloak of the Wanderer",
        descriptors: [
          { label: "Effect", value: "+2 stealth in shadow" },
          { label: "Source", value: "third-floor cache" },
        ],
      },
    })
    expect(screen.getByText("Item Acquired")).toBeDefined()
    expect(screen.getByText("Cloak of the Wanderer")).toBeDefined()
    expect(screen.getByText("Effect")).toBeDefined()
    expect(screen.getByText("+2 stealth in shadow")).toBeDefined()
    expect(screen.getByText("Source")).toBeDefined()
    expect(screen.getByText("third-floor cache")).toBeDefined()
  })

  test("item-award renders name-only with no descriptor lines", () => {
    renderWindow({ type: "item-award", award: { item: "Brass Key" } })
    expect(screen.getByText("Item Acquired")).toBeDefined()
    expect(screen.getByText("Brass Key")).toBeDefined()
  })

  test("status-assessment renders name/level/class + numeric attribute & pool readouts", () => {
    renderWindow({
      type: "status-assessment",
      assessment: {
        name: "Alan",
        level: 1,
        class: "None",
        attributes: { WILL: 16 },
        pools: { health: 70 },
      },
    })
    expect(screen.getByText("Status Assessment")).toBeDefined()
    expect(screen.getByText("Alan")).toBeDefined()
    expect(screen.getByText("Lv 1")).toBeDefined()
    expect(screen.getByText("WILL")).toBeDefined()
    expect(screen.getByText("16")).toBeDefined()
    expect(screen.getByText("health")).toBeDefined()
    expect(screen.getByText("70")).toBeDefined()
  })

  test("talent-activation renders holder/talent/status + optional note as a flat readout", () => {
    renderWindow({
      type: "talent-activation",
      activation: {
        holder: "Nyx",
        talent: "unknown",
        status: "first activation",
        note: "selection required",
      },
    })
    expect(screen.getByText("Talent Activation")).toBeDefined()
    expect(screen.getByText("Nyx")).toBeDefined()
    expect(screen.getByText("unknown")).toBeDefined()
    expect(screen.getByText("first activation")).toBeDefined()
    expect(screen.getByText("selection required")).toBeDefined()
  })

  test("system-choice renders read-only for a signed-out viewer (no confirm)", () => {
    renderInteractive(CHOICE_WINDOW, null)
    expect(screen.getByText("Choose a perk")).toBeDefined()
    expect(screen.getByText("Ironhide")).toBeDefined()
    expect(screen.getByText("Swiftness")).toBeDefined()
    expect(screen.getByText("Sign in as the player to choose.")).toBeDefined()
    expect(screen.queryByRole("button", { name: "Confirm" })).toBeNull()
  })

  test("system-choice is interactive for a signed-in owner: confirm arms on pick", () => {
    renderInteractive(CHOICE_WINDOW, "user-1")
    const confirm = screen.getByRole("button", { name: "Confirm" })
    expect(confirm.hasAttribute("disabled")).toBe(true)
    fireEvent.click(screen.getByText("Ironhide"))
    expect(confirm.hasAttribute("disabled")).toBe(false)
  })

  test("system-choice renders resolved/frozen once selectedOptionId is committed", () => {
    renderInteractive(
      {
        type: "system-choice",
        choice: { ...CHOICE_WINDOW.choice, selectedOptionId: "ironhide" },
      },
      "user-1"
    )
    expect(screen.getByText("chosen")).toBeDefined()
    expect(screen.getByText("Selection recorded.")).toBeDefined()
    expect(screen.queryByRole("button", { name: "Confirm" })).toBeNull()
  })
})
