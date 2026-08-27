import { describe, expect, it } from "bun:test"
import { deriveShellEmptyState } from "./page-system-shell-helpers"

describe("deriveShellEmptyState", () => {
  it("view mode with zero views: keeps the view-tab strip, shows the empty card in-content", () => {
    const r = deriveShellEmptyState({ isViewMode: true, viewCount: 0, tabCount: 0, loading: false })
    expect(r.showBareEmpty).toBe(false)
    expect(r.showEmptyViewState).toBe(true)
  })

  it("view mode with views present: no empty card, renders children", () => {
    const r = deriveShellEmptyState({ isViewMode: true, viewCount: 3, tabCount: 0, loading: false })
    expect(r.showBareEmpty).toBe(false)
    expect(r.showEmptyViewState).toBe(false)
  })

  it("non-view caller with no tabs: short-circuits to the bare empty card", () => {
    const r = deriveShellEmptyState({
      isViewMode: false,
      viewCount: 0,
      tabCount: 0,
      loading: false,
    })
    expect(r.showBareEmpty).toBe(true)
    expect(r.showEmptyViewState).toBe(false)
  })

  it("non-view caller with static tabs: neither empty state", () => {
    const r = deriveShellEmptyState({
      isViewMode: false,
      viewCount: 0,
      tabCount: 1,
      loading: false,
    })
    expect(r.showBareEmpty).toBe(false)
    expect(r.showEmptyViewState).toBe(false)
  })

  it("loading suppresses the bare empty card so the skeleton can show", () => {
    const r = deriveShellEmptyState({ isViewMode: false, viewCount: 0, tabCount: 0, loading: true })
    expect(r.showBareEmpty).toBe(false)
  })

  it("loading does not suppress the in-content empty-view state", () => {
    const r = deriveShellEmptyState({ isViewMode: true, viewCount: 0, tabCount: 0, loading: true })
    expect(r.showEmptyViewState).toBe(true)
  })
})
