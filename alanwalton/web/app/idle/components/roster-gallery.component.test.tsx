import { afterEach, describe, expect, test } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { BASE_IMAGE_ID } from "../lib/core/constants"
import { formatCollectedBadge, type GirlCardVM } from "~/idle/lib/roster-view"
import { GalleryGrid } from "./roster-gallery"

function vm(overrides: Partial<GirlCardVM> = {}): GirlCardVM {
  return {
    slug: "nova",
    name: "Nova",
    color: "var(--blue)",
    locked: false,
    portrait: "portraits/nova.png",
    frontImageId: "a",
    images: ["a", "b"],
    pool: ["a", "b", "c", "d"],
    stars: 0,
    dupeProgress: 0,
    nextThreshold: null,
    imageCount: 2,
    level: null,
    stage: "",
    rank: 1,
    baseRate: 0,
    trainCost: 0,
    train10Cost: 0,
    ...overrides,
  }
}

type SelectCall = readonly [string, string]

function stubActions() {
  const calls: SelectCall[] = []
  return {
    calls,
    actions: {
      selectImage: (slug: string, image: string): undefined => {
        calls.push([slug, image])
      },
      error: null,
    },
  }
}

afterEach(cleanup)

describe("GalleryGrid — owned / pool split (#13944)", () => {
  test("owned images render as selectable buttons; the undrawn pool is blacked out and inert", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)

    expect(screen.getByRole("button", { name: "Current front image" })).toBeDefined()
    expect(screen.getByRole("button", { name: "Set as card front" })).toBeDefined()

    expect(screen.getAllByRole("img", { name: "Undrawn — locked" }).length).toBe(2)
  })

  test("shows the collected count as owned / pool, counting the base (#14459)", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)
    expect(screen.getByText("3 / 5 collected")).toBeDefined()
  })

  test("does not count a base that isn't there — empty portrait stays owned / pool (#14459)", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm({ portrait: "" })} actions={actions} onClose={() => {}} />)
    expect(screen.getByText("2 / 4 collected")).toBeDefined()
  })

  test("cover-as-variant Selah reads 1/1 with ONE tile, not a duplicated 2/2 (#14738 RE-OPEN #2)", () => {
    const selah = vm({ images: ["a"], pool: ["a"], frontImageId: null, portrait: "/api/image/a" })
    const { actions } = stubActions()
    render(<GalleryGrid card={selah} actions={actions} onClose={() => {}} />)
    expect(screen.getByText("1 / 1 collected")).toBeDefined()
    expect(screen.getByRole("button", { name: "Current base cover" })).toBeDefined()
    expect(screen.queryByRole("button", { name: "Set as card front" })).toBeNull()
    expect(screen.queryByRole("button", { name: "Current front image" })).toBeNull()
    expect(screen.queryAllByRole("img", { name: "Undrawn — locked" }).length).toBe(0)
    expect(formatCollectedBadge(selah)).toBe("1/1 collected")
  })
})

describe("GalleryGrid — mirror-not-driver pick", () => {
  test("clicking an owned image emits selectImage(slug, image) and nothing else", () => {
    const { calls, actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)

    fireEvent.click(screen.getByRole("button", { name: "Set as card front" }))

    expect(calls).toEqual([["nova", "b"]])
  })

  test("does not emit for an undrawn (blacked-out) tile — it is inert", () => {
    const { calls, actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)

    const blacked = screen.getAllByRole("img", { name: "Undrawn — locked" })
    for (const tile of blacked) fireEvent.click(tile)
    expect(calls).toEqual([])
  })
})

describe("GalleryGrid — base cover option (never orphaned, #14459)", () => {
  test("renders an always-available base tile alongside the owned variants", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)
    expect(screen.getByRole("button", { name: "Reset to base cover" })).toBeDefined()
  })

  test("clicking the base tile emits selectImage(slug, BASE_IMAGE_ID) and nothing else", () => {
    const { calls, actions } = stubActions()
    render(<GalleryGrid card={vm()} actions={actions} onClose={() => {}} />)
    fireEvent.click(screen.getByRole("button", { name: "Reset to base cover" }))
    expect(calls).toEqual([["nova", BASE_IMAGE_ID]])
  })

  test("when the base is the current front (frontImageId null), the base tile is marked current", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm({ frontImageId: null })} actions={actions} onClose={() => {}} />)
    expect(screen.getByRole("button", { name: "Current base cover" })).toBeDefined()
    expect(screen.queryByRole("button", { name: "Current front image" })).toBeNull()
  })

  test("omits the base tile when there is no cover art to return to (empty portrait)", () => {
    const { actions } = stubActions()
    render(<GalleryGrid card={vm({ portrait: "" })} actions={actions} onClose={() => {}} />)
    expect(screen.queryByRole("button", { name: "Reset to base cover" })).toBeNull()
    expect(screen.queryByRole("button", { name: "Current base cover" })).toBeNull()
  })
})
