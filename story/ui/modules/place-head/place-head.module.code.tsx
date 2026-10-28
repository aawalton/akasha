"use client"

import { UnderlineTabsList } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { X } from "lucide-react"
import { createContext, type ReactNode, useContext, useState } from "react"
import { createPortal } from "react-dom"

const HEAD = "shrink-0 border-surface-2 border-b"

const TITLE_ROW = "relative flex h-12 items-center justify-center px-12"

const TITLE = "truncate font-semibold text-lg text-primary"

const CLOSE = "absolute right-3 rounded-full"

const RULED = "border-surface-2 border-b"

const HEADLESS = "headless"

type TabsAt = HTMLDivElement | null | typeof HEADLESS

const TabsHeld = createContext<TabsAt>(HEADLESS)

export function PlaceHeaded({
  label,
  onClose,
  className,
  children,
}: {
  label: string
  onClose: () => void
  className?: string
  children: ReactNode
}) {
  const [tabsAt, setTabsAt] = useState<HTMLDivElement | null>(null)
  return (
    <TabsHeld.Provider value={tabsAt}>
      <header className={cn(HEAD, className)}>
        <div className={TITLE_ROW}>
          <h2 className={TITLE}>{label}</h2>
          <Button
            type="button"
            variant="tertiary"
            size="icon-sm"
            aria-label={`Close ${label}`}
            className={CLOSE}
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
        <div ref={setTabsAt} />
      </header>
      {children}
    </TabsHeld.Provider>
  )
}

export function PlaceTabs({ children }: { children: ReactNode }) {
  const tabsAt = useContext(TabsHeld)
  if (tabsAt === HEADLESS)
    return <UnderlineTabsList className={RULED}>{children}</UnderlineTabsList>
  if (tabsAt === null) return null
  return createPortal(<UnderlineTabsList>{children}</UnderlineTabsList>, tabsAt)
}
