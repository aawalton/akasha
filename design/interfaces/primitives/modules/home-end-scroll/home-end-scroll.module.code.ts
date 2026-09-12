import type * as React from "react"

export function handleHomeEndScroll(event: React.KeyboardEvent): undefined {
  if (event.key === "Home") {
    window.scrollTo({ top: 0 })
  } else if (event.key === "End") {
    window.scrollTo({ top: document.documentElement.scrollHeight })
  }
}
