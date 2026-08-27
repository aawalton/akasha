import { describe, expect, test } from "bun:test"
import { expandDateMentions } from "./expand-date-mentions"

const now = new Date("2026-01-15T17:00:00Z")

describe("expandDateMentions", () => {
  test("expands a lone @date: token to its smart-date label", () => {
    expect(expandDateMentions("@date:2026-01-15", now)).toBe("Today")
  })

  test("expands an @date: token embedded in surrounding text", () => {
    expect(expandDateMentions("Workout on @date:2026-01-16", now)).toBe("Workout on Tomorrow")
  })

  test("absolute dates expand to 'DD MMM YYYY'", () => {
    expect(expandDateMentions("@date:2026-01-08 session", now)).toBe("08 Jan 2026 session")
  })

  test("text with no @date: token is unchanged", () => {
    expect(expandDateMentions("just some plain text", now)).toBe("just some plain text")
  })

  test("@page: mentions are left untouched", () => {
    expect(expandDateMentions("@page:abc123", now)).toBe("@page:abc123")
  })

  test("mixed @page: and @date: only expands the date token", () => {
    expect(expandDateMentions("see @page:abc and @date:2026-01-15", now)).toBe(
      "see @page:abc and Today"
    )
  })

  test("two date tokens in one string both expand", () => {
    expect(expandDateMentions("@date:2026-01-14 then @date:2026-01-16", now)).toBe(
      "Yesterday then Tomorrow"
    )
  })

  test("malformed date tokens are left literal (regex only matches YYYY-MM-DD)", () => {
    expect(expandDateMentions("@date:notadate", now)).toBe("@date:notadate")
    expect(expandDateMentions("@date:2026-13-99", now)).toBe("@date:2026-13-99")
  })
})
