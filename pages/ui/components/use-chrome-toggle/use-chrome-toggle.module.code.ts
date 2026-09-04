"use client"

import { shouldToggleChrome } from "@akasha/pages-ui-components/chrome-toggle-decider"
import { type MouseEvent as ReactMouseEvent, useEffect, useState } from "react"

export function useChromeToggle(): {
  chromeHidden: boolean
  onSurfaceClick: (e: ReactMouseEvent<HTMLElement>) => void
} {
  const [chromeHidden, setChromeHidden] = useState(false)

  useEffect(() => {
    if (chromeHidden) {
      document.documentElement.dataset.chromeHidden = ""
    } else {
      delete document.documentElement.dataset.chromeHidden
    }
    return () => {
      delete document.documentElement.dataset.chromeHidden
    }
  }, [chromeHidden])

  const onSurfaceClick = (e: ReactMouseEvent<HTMLElement>) => {
    const selection = window.getSelection()
    if (
      shouldToggleChrome({
        target: e.target,
        hasTextSelection: selection != null && !selection.isCollapsed,
        isDesktop: window.matchMedia("(min-width: 584px)").matches,
      })
    ) {
      setChromeHidden((hidden) => !hidden)
    }
  }

  return { chromeHidden, onSurfaceClick }
}
