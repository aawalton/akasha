import { describe, expect, test } from "bun:test"
import {
  buildPageHref,
  buildPageHrefParam,
  buildPageListingHref,
  buildViewPropertiesHref,
  DISPLAY_PARAM,
  DISPLAY_PROPERTIES,
  FALLBACK_SLUG,
  ID_SUFFIX_LENGTH,
  ID_SUFFIX_PATTERN,
  PageTypeSlug,
  parseDisplayMode,
  parsePageHrefParam,
  safeInternalPath,
  safeRedirectTarget,
} from "./index"

const ID = "0193abcd-ef01-7234-89ab-cdef01234567"
const SUFFIX = "01234567"

describe("buildPageHref", () => {
  test("uses the persisted slug when provided", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("seat"),
        slug: "my-seat",
        fallbackSlugSource: "ignored",
        id: ID,
      })
    ).toBe(`/seat/my-seat-${SUFFIX}`)
  })

  test("slugifies fallbackSlugSource when slug is null", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: "My Page",
        id: ID,
      })
    ).toBe(`/view/my-page-${SUFFIX}`)
  })

  test("slugifies fallbackSlugSource when slug is undefined", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: undefined,
        fallbackSlugSource: "My Page",
        id: ID,
      })
    ).toBe(`/view/my-page-${SUFFIX}`)
  })

  test("collapses whitespace and strips non-alphanumeric in fallback", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: "  Stamina DPS (PvP)  ",
        id: ID,
      })
    ).toBe(`/view/stamina-dps-pvp-${SUFFIX}`)
  })

  test("collapses underscores and unicode-ish chars to dashes in fallback", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: "Hello_World—Foo",
        id: ID,
      })
    ).toBe(`/view/hello-world-foo-${SUFFIX}`)
  })

  test("falls back to FALLBACK_SLUG when slug is null and fallbackSlugSource is empty", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: "",
        id: ID,
      })
    ).toBe(`/view/${FALLBACK_SLUG}-${SUFFIX}`)
  })

  test("falls back to FALLBACK_SLUG when slug is null and fallbackSlugSource is null", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: null,
        id: ID,
      })
    ).toBe(`/view/${FALLBACK_SLUG}-${SUFFIX}`)
  })

  test("falls back to FALLBACK_SLUG when slug is null and fallbackSlugSource slugifies to empty", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: null,
        fallbackSlugSource: "!!!",
        id: ID,
      })
    ).toBe(`/view/${FALLBACK_SLUG}-${SUFFIX}`)
  })

  test("uses only the trailing 8 hex chars of the id", () => {
    expect(
      buildPageHref({
        pageTypeSlug: PageTypeSlug("view"),
        slug: "x",
        fallbackSlugSource: null,
        id: "ffffffffffffffffffffffffabcdef01",
      })
    ).toBe("/view/x-abcdef01")
  })
})

describe("buildPageHrefParam", () => {
  test("returns the bare `{slug}-{suffix}` param without a leading path", () => {
    expect(
      buildPageHrefParam({
        pageTypeSlug: PageTypeSlug("story-chapter"),
        slug: "ten-fifty-three",
        fallbackSlugSource: "ignored",
        id: ID,
      })
    ).toBe(`ten-fifty-three-${SUFFIX}`)
  })

  test("slugifies fallbackSlugSource when slug is null", () => {
    expect(
      buildPageHrefParam({
        pageTypeSlug: PageTypeSlug("story-chapter"),
        slug: null,
        fallbackSlugSource: "10.53 UEG",
        id: ID,
      })
    ).toBe(`10-53-ueg-${SUFFIX}`)
  })

  test("falls back to FALLBACK_SLUG when nothing slugifies", () => {
    expect(
      buildPageHrefParam({
        pageTypeSlug: PageTypeSlug("story-chapter"),
        slug: null,
        fallbackSlugSource: "!!!",
        id: ID,
      })
    ).toBe(`${FALLBACK_SLUG}-${SUFFIX}`)
  })

  test("is the suffix of the full buildPageHref for the same args", () => {
    const args = {
      pageTypeSlug: PageTypeSlug("story-chapter"),
      slug: null,
      fallbackSlugSource: "The Shape of the Problem",
      id: ID,
    }
    expect(buildPageHref(args)).toBe(`/story-chapter/${buildPageHrefParam(args)}`)
  })

  test("a bare page-href param round-trips through parsePageHrefParam", () => {
    const param = buildPageHrefParam({
      pageTypeSlug: PageTypeSlug("story-chapter"),
      slug: null,
      fallbackSlugSource: "The Boss of Floor 8",
      id: ID,
    })
    expect(parsePageHrefParam(param)).toEqual({
      slug: "the-boss-of-floor-8",
      idSuffix: SUFFIX,
    })
  })
})

describe("parsePageHrefParam", () => {
  test("extracts trailing 8-hex suffix and slug", () => {
    expect(parsePageHrefParam(`my-page-${SUFFIX}`)).toEqual({
      slug: "my-page",
      idSuffix: SUFFIX,
    })
  })

  test("handles slugs containing many hyphens", () => {
    expect(parsePageHrefParam(`stamina-dps-pvp-${SUFFIX}`)).toEqual({
      slug: "stamina-dps-pvp",
      idSuffix: SUFFIX,
    })
  })

  test("returns slug=null for bare 8-hex with no slug part", () => {
    expect(parsePageHrefParam(SUFFIX)).toEqual({ slug: null, idSuffix: SUFFIX })
  })

  test("returns null when suffix is shorter than 8 chars", () => {
    expect(parsePageHrefParam("foo-1234567")).toBeNull()
  })

  test("returns null when suffix contains non-hex chars", () => {
    expect(parsePageHrefParam("foo-1234567g")).toBeNull()
  })

  test("returns null when suffix has uppercase chars", () => {
    expect(parsePageHrefParam("foo-ABCDEF12")).toBeNull()
  })

  test("returns null on empty input", () => {
    expect(parsePageHrefParam("")).toBeNull()
  })

  test("rejects a full uuid (no longer back-compat)", () => {
    expect(parsePageHrefParam(ID)).toBeNull()
  })
})

describe("round-trip build → parse", () => {
  test("decorative slug round-trips when already slug-shaped", () => {
    const href = buildPageHref({
      pageTypeSlug: PageTypeSlug("seat"),
      slug: "claude-opus",
      fallbackSlugSource: null,
      id: ID,
    })
    const param = href.replace("/seat/", "")
    expect(parsePageHrefParam(param)).toEqual({
      slug: "claude-opus",
      idSuffix: SUFFIX,
    })
  })

  test("fallback slug round-trips through parse", () => {
    const href = buildPageHref({
      pageTypeSlug: PageTypeSlug("view"),
      slug: null,
      fallbackSlugSource: "Hello World",
      id: ID,
    })
    const param = href.replace("/view/", "")
    expect(parsePageHrefParam(param)).toEqual({
      slug: "hello-world",
      idSuffix: SUFFIX,
    })
  })

  test("FALLBACK_SLUG round-trips through parse", () => {
    const href = buildPageHref({
      pageTypeSlug: PageTypeSlug("view"),
      slug: null,
      fallbackSlugSource: null,
      id: ID,
    })
    const param = href.replace("/view/", "")
    expect(parsePageHrefParam(param)).toEqual({
      slug: FALLBACK_SLUG,
      idSuffix: SUFFIX,
    })
  })
})

describe("parseDisplayMode", () => {
  test("resolves the explicit properties opt-in", () => {
    expect(parseDisplayMode(DISPLAY_PROPERTIES)).toBe("properties")
    expect(parseDisplayMode("properties")).toBe("properties")
  })

  test("defaults absent / null / unknown values to View Page", () => {
    expect(parseDisplayMode(null)).toBe("page")
    expect(parseDisplayMode(undefined)).toBe("page")
    expect(parseDisplayMode("")).toBe("page")
    expect(parseDisplayMode("page")).toBe("page")
    expect(parseDisplayMode("Properties")).toBe("page")
    expect(parseDisplayMode("props")).toBe("page")
  })

  test("param name is collision-free against tab-sync and media params", () => {
    expect(DISPLAY_PARAM).toBe("display")
    expect(["tab", "speed", "variant"]).not.toContain(DISPLAY_PARAM)
  })
})

describe("buildViewPropertiesHref", () => {
  test("appends the display=properties query to the pathname", () => {
    expect(buildViewPropertiesHref("/persona/dalla-01234567")).toBe(
      "/persona/dalla-01234567?display=properties"
    )
  })

  test("uses the canonical param + value constants", () => {
    const href = buildViewPropertiesHref("/game/idle-abcdef01")
    expect(href).toBe(`/game/idle-abcdef01?${DISPLAY_PARAM}=${DISPLAY_PROPERTIES}`)
    expect(parseDisplayMode(new URLSearchParams(href.split("?")[1]).get(DISPLAY_PARAM))).toBe(
      "properties"
    )
  })
})

describe("constants", () => {
  test("ID_SUFFIX_LENGTH is 8", () => {
    expect(ID_SUFFIX_LENGTH).toBe(8)
  })

  test("ID_SUFFIX_PATTERN matches lowercase 8-hex", () => {
    expect(ID_SUFFIX_PATTERN.test("abcdef01")).toBe(true)
    expect(ID_SUFFIX_PATTERN.test("ABCDEF01")).toBe(false)
    expect(ID_SUFFIX_PATTERN.test("abcdef0")).toBe(false)
  })

  test("FALLBACK_SLUG is 'untitled'", () => {
    expect(FALLBACK_SLUG).toBe("untitled")
  })
})

describe("buildPageListingHref", () => {
  test("builds the canonical listing shape with a string query", () => {
    expect(buildPageListingHref({ pluralSlug: "tasks", query: "groups=dueDate" })).toBe(
      "/tasks/?groups=dueDate"
    )
  })

  test("builds from a URLSearchParams query", () => {
    const params = new URLSearchParams()
    params.set("groups", "dueDate")
    params.set("groupGranularity", "week")
    expect(buildPageListingHref({ pluralSlug: "tasks", query: params })).toBe(
      "/tasks/?groups=dueDate&groupGranularity=week"
    )
  })

  test("omits the query string when query is undefined", () => {
    expect(buildPageListingHref({ pluralSlug: "tasks" })).toBe("/tasks/")
  })

  test("omits the query string for an empty URLSearchParams", () => {
    expect(buildPageListingHref({ pluralSlug: "tasks", query: new URLSearchParams() })).toBe(
      "/tasks/"
    )
  })

  test("omits the query string for an empty string", () => {
    expect(buildPageListingHref({ pluralSlug: "projects", query: "" })).toBe("/projects/")
  })

  test("keeps the trailing slash before the query (distinguishes listing from detail)", () => {
    const href = buildPageListingHref({ pluralSlug: "pipelines", query: "filters=%5B%5D" })
    expect(href.startsWith("/pipelines/?")).toBe(true)
  })
})

describe("safeInternalPath", () => {
  test("returns an origin-relative absolute path unchanged", () => {
    expect(safeInternalPath("/question/abc-12345678")).toBe("/question/abc-12345678")
    expect(safeInternalPath("/nav/tasks-a7242626")).toBe("/nav/tasks-a7242626")
  })

  test("preserves the query string", () => {
    expect(safeInternalPath("/nav/tracking-690c624f?tab=x")).toBe("/nav/tracking-690c624f?tab=x")
  })

  test("accepts the root path", () => {
    expect(safeInternalPath("/")).toBe("/")
  })

  test("rejects a relative path (no leading slash)", () => {
    expect(safeInternalPath("question/abc")).toBeNull()
    expect(safeInternalPath("")).toBeNull()
  })

  test("rejects a protocol-relative //host (browser resolves against the wire scheme)", () => {
    expect(safeInternalPath("//evil.com/steal")).toBeNull()
  })

  test("rejects any scheme embedded in the path", () => {
    expect(safeInternalPath("/a://b")).toBeNull()
    expect(safeInternalPath("https://evil.com/x")).toBeNull()
  })

  test("rejects a backslash (a / alias in URL parsing)", () => {
    expect(safeInternalPath("/path\\evil.com")).toBeNull()
  })

  test("rejects the backslash target that resolves off-origin", () => {
    expect(new URL("/\\evil.com", "https://app.example.com").href).toBe("https://evil.com/")
    expect(safeInternalPath("/\\evil.com")).toBeNull()
    expect(safeInternalPath("/\\/evil.com")).toBeNull()
  })

  test("rejects tab, LF and CR smuggled between the slashes", () => {
    for (const stripped of ["\t", "\n", "\r"]) {
      const target = `/${stripped}/evil.com`
      expect(new URL(target, "https://app.example.com").href).toBe("https://evil.com/")
      expect(safeInternalPath(target)).toBeNull()
    }
  })

  test("still admits the legitimate internal paths the guard exists to pass", () => {
    expect(safeInternalPath("/dashboard")).toBe("/dashboard")
    expect(safeInternalPath("/question/abc-12345678?tab=x#frag")).toBe(
      "/question/abc-12345678?tab=x#frag"
    )
    expect(safeInternalPath("/a:b")).toBe("/a:b")
  })
})

describe("safeRedirectTarget", () => {
  const HOSTS = ["alanwalton.com"] as const

  test("admits an internal path, delegating to safeInternalPath", () => {
    expect(safeRedirectTarget({ next: "/dashboard", allowedHosts: HOSTS })).toBe("/dashboard")
  })

  test("admits an allow-listed host and its subdomains", () => {
    expect(safeRedirectTarget({ next: "https://alanwalton.com/x", allowedHosts: HOSTS })).toBe(
      "https://alanwalton.com/x"
    )
    expect(safeRedirectTarget({ next: "https://atlas.alanwalton.com/", allowedHosts: HOSTS })).toBe(
      "https://atlas.alanwalton.com/"
    )
  })

  test("refuses the backslash target the route copies admitted", () => {
    expect(safeRedirectTarget({ next: "/\\evil.com", allowedHosts: HOSTS })).toBeNull()
  })

  test("refuses a host that merely ends with the allow-listed name", () => {
    expect(
      safeRedirectTarget({ next: "https://alanwalton.com.evil.com/", allowedHosts: HOSTS })
    ).toBeNull()
    expect(
      safeRedirectTarget({ next: "https://notalanwalton.com/", allowedHosts: HOSTS })
    ).toBeNull()
  })

  test("refuses a host assembled by a stripped character", () => {
    expect(
      safeRedirectTarget({ next: "https://alanwalton.com\t.evil.com/", allowedHosts: HOSTS })
    ).toBeNull()
  })

  test("refuses userinfo smuggling", () => {
    expect(
      safeRedirectTarget({ next: "https://alanwalton.com@evil.com/", allowedHosts: HOSTS })
    ).toBeNull()
  })

  test("refuses a non-https scheme on an allow-listed host", () => {
    expect(safeRedirectTarget({ next: "http://alanwalton.com/", allowedHosts: HOSTS })).toBeNull()
    expect(safeRedirectTarget({ next: "javascript:alert(1)", allowedHosts: HOSTS })).toBeNull()
  })

  test("refuses an absent or empty next", () => {
    expect(safeRedirectTarget({ next: null, allowedHosts: HOSTS })).toBeNull()
    expect(safeRedirectTarget({ next: "", allowedHosts: HOSTS })).toBeNull()
  })

  test("admits nothing external when the allow-list is empty", () => {
    expect(safeRedirectTarget({ next: "https://alanwalton.com/", allowedHosts: [] })).toBeNull()
    expect(safeRedirectTarget({ next: "/dashboard", allowedHosts: [] })).toBe("/dashboard")
  })
})
