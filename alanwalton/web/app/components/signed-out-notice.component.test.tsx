import { describe, expect, test } from "bun:test"
import { screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { MemoryRouter } from "react-router"
import { SIGNED_OUT_MESSAGE } from "~/lib/auth-error"
import { SignedOutNotice } from "./signed-out-notice"

describe("SignedOutNotice", () => {
  test("renders the honest signed-out message", () => {
    render(
      <MemoryRouter initialEntries={["/questions/abc"]}>
        <SignedOutNotice />
      </MemoryRouter>
    )
    expect(screen.getByText(new RegExp(SIGNED_OUT_MESSAGE, "i"))).toBeDefined()
  })

  test("offers a sign-in link carrying the current path as ?next=", () => {
    render(
      <MemoryRouter initialEntries={["/questions/abc?foo=1"]}>
        <SignedOutNotice />
      </MemoryRouter>
    )
    const link = screen.getByRole("link", { name: /sign in/i })
    const href = link.getAttribute("href") ?? ""
    expect(href.startsWith("/sign-in?next=")).toBe(true)
    expect(decodeURIComponent(href)).toContain("/questions/abc?foo=1")
  })
})
