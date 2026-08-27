import { describe, expect, it } from "bun:test"
import { COLUMN_GAP, COLUMN_WIDTH, computeColumnCount, PAGE_PADDING } from "./layout-data"

type SidebarState = "hidden" | "forced-collapsed" | "collapsed" | "expanded"

function getSidebarMargin(state: SidebarState): number {
  if (state === "hidden") return 0
  if (state === "forced-collapsed" || state === "collapsed") return 64
  return 256
}

function getSidebarStateForViewport(viewportWidth: number, sidebarOpen: boolean): SidebarState {
  if (viewportWidth < 584) return "hidden"
  if (viewportWidth < 776) return "forced-collapsed"
  return sidebarOpen ? "expanded" : "collapsed"
}

function getExpectedColumnCount(viewportWidth: number, state: SidebarState): number {
  const containerWidth = viewportWidth - getSidebarMargin(state)
  return computeColumnCount(containerWidth)
}

describe("computeColumnCount", () => {
  it("clamps at minimum 1 column for narrow widths", () => {
    expect(computeColumnCount(0)).toBe(1)
    expect(computeColumnCount(375)).toBe(1)
    expect(computeColumnCount(520)).toBe(1)
  })

  it("returns 1 column up to 1015px", () => {
    expect(computeColumnCount(1015)).toBe(1)
  })

  it("switches to 2 columns at exactly 1016px", () => {
    expect(computeColumnCount(1015)).toBe(1)
    expect(computeColumnCount(1016)).toBe(2)
  })

  it("stays at 2 columns up to 1511px", () => {
    expect(computeColumnCount(1200)).toBe(2)
    expect(computeColumnCount(1511)).toBe(2)
  })

  it("switches to 3 columns at exactly 1512px", () => {
    expect(computeColumnCount(1511)).toBe(2)
    expect(computeColumnCount(1512)).toBe(3)
  })

  it("constants derive the same breakpoints algebraically", () => {
    const twoColThreshold = PAGE_PADDING - COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * 2
    expect(twoColThreshold).toBe(1016)
    expect(computeColumnCount(twoColThreshold - 1)).toBe(1)
    expect(computeColumnCount(twoColThreshold)).toBe(2)

    const threeColThreshold = PAGE_PADDING - COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * 3
    expect(threeColThreshold).toBe(1512)
    expect(computeColumnCount(threeColThreshold - 1)).toBe(2)
    expect(computeColumnCount(threeColThreshold)).toBe(3)
  })
})

describe("skeleton CSS breakpoint alignment", () => {
  it("@[1016px] container query aligns with 2-column threshold", () => {
    expect(computeColumnCount(1015)).toBe(1)
    expect(computeColumnCount(1016)).toBe(2)
  })

  it("@[1512px] container query aligns with 3-column threshold", () => {
    expect(computeColumnCount(1511)).toBe(2)
    expect(computeColumnCount(1512)).toBe(3)
  })
})

describe("sidebar margin rules", () => {
  it("pre-hydration: margin matches post-hydration (blocking script)", () => {
    expect(getSidebarMargin("hidden")).toBe(0)
    expect(getSidebarMargin("forced-collapsed")).toBe(64)
    expect(getSidebarMargin("collapsed")).toBe(64)
    expect(getSidebarMargin("expanded")).toBe(256)
  })

  it("hidden: margin 0", () => {
    expect(getSidebarMargin("hidden")).toBe(0)
  })

  it("forced-collapsed: margin 64px", () => {
    expect(getSidebarMargin("forced-collapsed")).toBe(64)
  })

  it("collapsed: margin 64px", () => {
    expect(getSidebarMargin("collapsed")).toBe(64)
  })

  it("expanded: margin 256px", () => {
    expect(getSidebarMargin("expanded")).toBe(256)
  })
})

describe("viewport + sidebar state -> column count", () => {
  interface Case {
    viewport: number
    state: SidebarState
    expectedContainer: number
    expectedColumns: number
  }

  const cases: Case[] = [
    { viewport: 375, state: "hidden", expectedContainer: 375, expectedColumns: 1 },
    { viewport: 583, state: "hidden", expectedContainer: 583, expectedColumns: 1 },

    { viewport: 584, state: "forced-collapsed", expectedContainer: 520, expectedColumns: 1 },
    { viewport: 775, state: "forced-collapsed", expectedContainer: 711, expectedColumns: 1 },

    { viewport: 776, state: "collapsed", expectedContainer: 712, expectedColumns: 1 },
    { viewport: 776, state: "expanded", expectedContainer: 520, expectedColumns: 1 },

    { viewport: 1079, state: "collapsed", expectedContainer: 1015, expectedColumns: 1 },
    { viewport: 1079, state: "expanded", expectedContainer: 823, expectedColumns: 1 },
    { viewport: 1080, state: "collapsed", expectedContainer: 1016, expectedColumns: 2 },
    { viewport: 1080, state: "expanded", expectedContainer: 824, expectedColumns: 1 },

    { viewport: 1271, state: "collapsed", expectedContainer: 1207, expectedColumns: 2 },
    { viewport: 1271, state: "expanded", expectedContainer: 1015, expectedColumns: 1 },
    { viewport: 1272, state: "collapsed", expectedContainer: 1208, expectedColumns: 2 },
    { viewport: 1272, state: "expanded", expectedContainer: 1016, expectedColumns: 2 },

    { viewport: 1575, state: "collapsed", expectedContainer: 1511, expectedColumns: 2 },
    { viewport: 1575, state: "expanded", expectedContainer: 1319, expectedColumns: 2 },
    { viewport: 1576, state: "collapsed", expectedContainer: 1512, expectedColumns: 3 },
    { viewport: 1576, state: "expanded", expectedContainer: 1320, expectedColumns: 2 },

    { viewport: 1767, state: "collapsed", expectedContainer: 1703, expectedColumns: 3 },
    { viewport: 1767, state: "expanded", expectedContainer: 1511, expectedColumns: 2 },
    { viewport: 1768, state: "collapsed", expectedContainer: 1704, expectedColumns: 3 },
    { viewport: 1768, state: "expanded", expectedContainer: 1512, expectedColumns: 3 },
  ]

  for (const { viewport, state, expectedContainer, expectedColumns } of cases) {
    it(`vp=${viewport} ${state} -> container=${expectedContainer} -> ${expectedColumns} col`, () => {
      const margin = getSidebarMargin(state)
      const containerWidth = viewport - margin
      expect(containerWidth).toBe(expectedContainer)
      expect(computeColumnCount(containerWidth)).toBe(expectedColumns)
    })
  }
})

describe("pre-hydration: blocking script provides correct margin", () => {
  interface Case {
    viewport: number
    sidebarOpen: boolean
    expectedColumns: number
  }

  const cases: Case[] = [
    { viewport: 375, sidebarOpen: false, expectedColumns: 1 },
    { viewport: 375, sidebarOpen: true, expectedColumns: 1 },

    { viewport: 584, sidebarOpen: false, expectedColumns: 1 },
    { viewport: 584, sidebarOpen: true, expectedColumns: 1 },

    { viewport: 1015, sidebarOpen: false, expectedColumns: 1 },
    { viewport: 1015, sidebarOpen: true, expectedColumns: 1 },
    { viewport: 1016, sidebarOpen: false, expectedColumns: 1 },
    { viewport: 1016, sidebarOpen: true, expectedColumns: 1 },
    { viewport: 1271, sidebarOpen: false, expectedColumns: 2 },
    { viewport: 1271, sidebarOpen: true, expectedColumns: 1 },
    { viewport: 1511, sidebarOpen: false, expectedColumns: 2 },
    { viewport: 1511, sidebarOpen: true, expectedColumns: 2 },
    { viewport: 1512, sidebarOpen: false, expectedColumns: 2 },
    { viewport: 1512, sidebarOpen: true, expectedColumns: 2 },
    { viewport: 1920, sidebarOpen: false, expectedColumns: 3 },
    { viewport: 1920, sidebarOpen: true, expectedColumns: 3 },
  ]

  for (const { viewport, sidebarOpen, expectedColumns } of cases) {
    const label = sidebarOpen ? "expanded" : "collapsed"
    it(`vp=${viewport} ${label} pre-hydration -> ${expectedColumns} col`, () => {
      const state = getSidebarStateForViewport(viewport, sidebarOpen)
      expect(getExpectedColumnCount(viewport, state)).toBe(expectedColumns)
    })
  }
})

describe("no hydration layout shift: skeleton must match post-hydration column count", () => {
  interface Case {
    viewport: number
    sidebarOpen: boolean
  }

  const cases: Case[] = [
    { viewport: 1568, sidebarOpen: false },

    { viewport: 1512, sidebarOpen: false },
    { viewport: 1540, sidebarOpen: false },
    { viewport: 1575, sidebarOpen: false },

    { viewport: 1512, sidebarOpen: true },
    { viewport: 1640, sidebarOpen: true },
    { viewport: 1767, sidebarOpen: true },

    { viewport: 1016, sidebarOpen: false },
    { viewport: 1050, sidebarOpen: false },
    { viewport: 1079, sidebarOpen: false },

    { viewport: 1016, sidebarOpen: true },
    { viewport: 1150, sidebarOpen: true },
    { viewport: 1271, sidebarOpen: true },
  ]

  for (const { viewport, sidebarOpen } of cases) {
    const label = sidebarOpen ? "expanded" : "collapsed"
    it(`vp=${viewport} ${label}: skeleton and hydrated column count must match`, () => {
      const skeletonColumns = getExpectedColumnCount(viewport, label)
      const state = getSidebarStateForViewport(viewport, sidebarOpen)
      const hydratedColumns = getExpectedColumnCount(viewport, state)
      expect(skeletonColumns).toBe(hydratedColumns)
    })
  }

  const stableCases: Case[] = [
    { viewport: 1576, sidebarOpen: false },
    { viewport: 1768, sidebarOpen: true },
    { viewport: 1080, sidebarOpen: false },
    { viewport: 1272, sidebarOpen: true },
    { viewport: 375, sidebarOpen: false },
    { viewport: 800, sidebarOpen: false },
    { viewport: 800, sidebarOpen: true },
  ]

  for (const { viewport, sidebarOpen } of stableCases) {
    const label = sidebarOpen ? "expanded" : "collapsed"
    it(`vp=${viewport} ${label}: stable (no shift expected)`, () => {
      const skeletonColumns = getExpectedColumnCount(viewport, label)
      const state = getSidebarStateForViewport(viewport, sidebarOpen)
      const hydratedColumns = getExpectedColumnCount(viewport, state)
      expect(skeletonColumns).toBe(hydratedColumns)
    })
  }
})
