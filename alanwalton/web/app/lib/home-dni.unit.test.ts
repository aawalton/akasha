import { describe, expect, test } from "bun:test"
import { navItemParamOf } from "./home-dni.server"

describe("navItemParamOf", () => {
  test("names the nav page that stands", () => {
    expect(
      navItemParamOf({ id: "019f3400-b4fa-784f-9ff0-1016896e80cc", slug: "home", title: "Home" })
    ).toBe("home-896e80cc")
  })

  test("is null where no nav page stands, rather than a href to one that does not", () => {
    expect(navItemParamOf({ slug: "home", title: "Home" })).toBeNull()
    expect(navItemParamOf({ id: "", slug: "home", title: "Home" })).toBeNull()
  })
})
