import type * as React from "react"

export function inlineEditKeyDown(
  save: () => void,
  cancel: () => void
): (e: React.KeyboardEvent<HTMLInputElement>) => void {
  return (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      save()
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  }
}
