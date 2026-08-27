import { describe, expect, it } from "bun:test"
import { selectDetailBody } from "./page-detail-content-helpers"

describe("selectDetailBody", () => {
  it("page still loading, nothing in hand → skeleton", () => {
    expect(
      selectDetailBody({
        hasPage: false,
        pageIsLoading: true,
        hasPageType: false,
        displayKind: undefined,
      })
    ).toBe("skeleton")
  })

  it("page in hand, page-type row not yet arrived → skeleton (never guesses default)", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: false,
        displayKind: undefined,
      })
    ).toBe("skeleton")
  })

  it("page-type row never arrives → stays skeleton, does not lie", () => {
    for (let render = 0; render < 3; render++) {
      expect(
        selectDetailBody({
          hasPage: true,
          pageIsLoading: false,
          hasPageType: false,
          displayKind: undefined,
        })
      ).toBe("skeleton")
    }
  })

  it("known reader layout → reader", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: true,
        displayKind: "reader",
      })
    ).toBe("reader")
  })

  it("known collection layout → collection", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: true,
        displayKind: "collection",
      })
    ).toBe("collection")
  })

  it("known explicit default layout → default", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: true,
        displayKind: "default",
      })
    ).toBe("default")
  })

  it("known page-type with no detailConfig.display → default", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: true,
        displayKind: undefined,
      })
    ).toBe("default")
  })

  it("custom display kind (idle/persona/…) → default on this generic surface", () => {
    expect(
      selectDetailBody({
        hasPage: true,
        pageIsLoading: false,
        hasPageType: true,
        displayKind: "idle",
      })
    ).toBe("default")
  })

  it("page settled as not-found → default (default body owns the empty state)", () => {
    expect(
      selectDetailBody({
        hasPage: false,
        pageIsLoading: false,
        hasPageType: false,
        displayKind: undefined,
      })
    ).toBe("default")
  })
})
