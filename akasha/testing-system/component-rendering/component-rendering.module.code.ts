import { render as renderThere } from "@testing-library/react"
import type { ReactElement } from "react"

export function render(ui: ReactElement): ReturnType<typeof renderThere> {
  return renderThere(ui)
}
