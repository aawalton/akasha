import { afterEach, describe, expect, it } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { Badge, IconBadge } from "./badge"

afterEach(() => {
  cleanup()
})

describe("Badge unknown-variant guard", () => {
  it("throws when Badge receives a variant outside the cva map", () => {
    expect(() =>
      render(
        // @ts-expect-error — deliberately invalid variant to exercise the runtime guard.
        <Badge variant="muted">label</Badge>
      )
    ).toThrow(/muted/)
  })

  it("throws when IconBadge receives a variant outside the cva map", () => {
    expect(() =>
      render(
        // @ts-expect-error — deliberately invalid variant to exercise the runtime guard.
        <IconBadge variant="muted" aria-label="x" />
      )
    ).toThrow(/muted/)
  })

  it("does not throw for a known variant", () => {
    expect(() => render(<Badge variant="elevation-muted">label</Badge>)).not.toThrow()
  })
})
