import type * as React from "react"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

export function handleHomeEndScroll(event: React.KeyboardEvent): undefined {
  if (event.key === "Home") {
    window.scrollTo({ top: 0 })
  } else if (event.key === "End") {
    window.scrollTo({ top: document.documentElement.scrollHeight })
  }
}
