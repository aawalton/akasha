import { afterEach, describe, expect, test } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { createMemoryRouter, Outlet, RouterProvider } from "react-router"
import { PageDetailErrorBoundary } from "./page-detail-error-boundary"

afterEach(() => {
  cleanup()
})

function AppShellStub() {
  return (
    <div>
      <span>APPSHELL</span>
      <Outlet />
    </div>
  )
}

function buildRouter() {
  return createMemoryRouter(
    [
      {
        path: "/",
        element: <AppShellStub />,
        children: [
          {
            path: "story-chapter/:param",
            loader: () => {
              throw new Response("Not Found", { status: 404 })
            },
            Component: () => <div>DETAIL-CONTENT</div>,
            ErrorBoundary: PageDetailErrorBoundary,
          },
        ],
      },
    ],
    { initialEntries: ["/story-chapter/apology-6fed9037"] }
  )
}

describe("PageDetailErrorBoundary containment", () => {
  test("a thrown detail-loader 404 is contained — the AppShell survives", async () => {
    render(<RouterProvider router={buildRouter()} />)
    expect(await screen.findByText("APPSHELL")).toBeDefined()
    expect(screen.queryByText("DETAIL-CONTENT")).toBeNull()
    expect(screen.getByText(/couldn't load/i)).toBeDefined()
    expect(screen.getByText(/try again/i)).toBeDefined()
  })
})
