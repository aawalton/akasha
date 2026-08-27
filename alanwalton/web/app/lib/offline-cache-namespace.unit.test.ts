import { afterEach, describe, expect, test } from "bun:test"
import {
  getOfflineCacheUserKey,
  namespacedPath,
  offlineCachePrefix,
  setOfflineCacheUserKey,
} from "./offline-cache-namespace"

afterEach(() => {
  setOfflineCacheUserKey(null)
})

describe("offline-cache namespace holder", () => {
  test("null before any user is set (pre-auth / browser)", () => {
    expect(getOfflineCacheUserKey()).toBeNull()
    expect(offlineCachePrefix()).toBeNull()
    expect(namespacedPath("content-pages-index.json")).toBeNull()
  })

  test("a set user yields a `u-<id>--` prefix and namespaced paths", () => {
    setOfflineCacheUserKey("user-123")
    expect(getOfflineCacheUserKey()).toBe("user-123")
    expect(offlineCachePrefix()).toBe("u-user-123--")
    expect(namespacedPath("content-pages-index.json")).toBe("u-user-123--content-pages-index.json")
    expect(namespacedPath("content-page-abc.json")).toBe("u-user-123--content-page-abc.json")
  })

  test("switching users re-scopes the namespace (latest wins)", () => {
    setOfflineCacheUserKey("user-a")
    expect(namespacedPath("pages-collection.json")).toBe("u-user-a--pages-collection.json")
    setOfflineCacheUserKey("user-b")
    expect(namespacedPath("pages-collection.json")).toBe("u-user-b--pages-collection.json")
  })

  test("clearing back to null re-parks the ports", () => {
    setOfflineCacheUserKey("user-a")
    setOfflineCacheUserKey(null)
    expect(offlineCachePrefix()).toBeNull()
    expect(namespacedPath("pages-collection.json")).toBeNull()
  })
})
