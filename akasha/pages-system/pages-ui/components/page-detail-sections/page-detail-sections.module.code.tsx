"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@akasha/design-primitives/collapsible"
import { MarkdownRenderer } from "@akasha/pages-ui/markdown/markdown-renderer"
import type { ReactNode } from "react"

const HEADING_TAGS = ["h2", "h3", "h4", "h5", "h6"] as const
type HeadingTag = (typeof HEADING_TAGS)[number]
const HEADING_CLASSES: Record<HeadingTag, string> = {
  h2: "font-semibold text-base",
  h3: "font-medium text-sm",
  h4: "font-medium text-sm text-secondary",
  h5: "text-sm text-secondary",
  h6: "text-sm text-tertiary",
}
const HEADING_PADDING: Record<HeadingTag, string> = {
  h2: "pt-4",
  h3: "pt-3",
  h4: "pt-2",
  h5: "pt-2",
  h6: "pt-1",
}

function pickHeadingTag(depth: number): HeadingTag {
  const idx = Math.min(Math.max(depth, 0), HEADING_TAGS.length - 1)
  let i = 0
  for (const tag of HEADING_TAGS) {
    if (i === idx) return tag
    i++
  }
  return HEADING_TAGS[0]
}

function formatKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function DisclosureTriangle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" className={className}>
      <polygon points="0,0 10,5 0,10" />
    </svg>
  )
}

export function hasValue(v: unknown): boolean {
  if (v == null) return false
  if (typeof v === "string") return v.length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === "object") return Object.keys(v).length > 0
  return true
}

export function ToggleSection({
  label,
  defaultOpen = false,
  hasContent = true,
  headingClassName = "font-semibold text-lg",
  children,
}: {
  label: string
  defaultOpen?: boolean
  hasContent?: boolean
  headingClassName?: string
  children: ReactNode
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger asChild>
        <button type="button" className="-m-2 flex w-full cursor-pointer items-center gap-2 p-2">
          <DisclosureTriangle
            className={`size-[7px] shrink-0 rotate-90 transition-transform duration-200 [[data-state=closed]_&]:rotate-0 ${hasContent ? "text-primary" : "text-tertiary"}`}
          />
          <h1 className={`select-none ${headingClassName}`}>{label}</h1>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pt-1 pl-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function JsonSectionRenderer({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value == null) return <span className="text-sm text-tertiary">Empty</span>

  if (typeof value === "string") {
    if (value.length === 0) return <span className="text-sm text-tertiary">Empty</span>
    return <MarkdownRenderer content={value} />
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return <span className="text-sm">{String(value)}</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-sm text-tertiary">Empty</span>
    return (
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
        {value.map((item, i) => (
          <li key={i}>
            {typeof item === "object" && item !== null ? (
              <JsonSectionRenderer value={item} depth={depth + 1} />
            ) : (
              String(item)
            )}
          </li>
        ))}
      </ul>
    )
  }

  if (typeof value === "object") {
    const entries = Object.entries(value)
    if (entries.length === 0) return <span className="text-sm text-tertiary">Empty</span>
    const tag = pickHeadingTag(depth)
    const cls = HEADING_CLASSES[tag]
    const pad = HEADING_PADDING[tag]
    return (
      <div className="flex flex-col gap-2">
        {entries.map(([key, val]) => {
          const Heading = tag
          const filled = hasValue(val)
          return (
            <Collapsible key={key} defaultOpen={false} className={pad}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="-m-1.5 flex w-full cursor-pointer items-center gap-1.5 p-1.5"
                >
                  <DisclosureTriangle
                    className={`size-1.5 shrink-0 rotate-90 transition-transform duration-200 [[data-state=closed]_&]:rotate-0 ${filled ? "text-primary" : "text-tertiary"}`}
                  />
                  <Heading className={`select-none ${cls}`}>{formatKey(key)}</Heading>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pt-1 pl-5">
                  <JsonSectionRenderer value={val} depth={depth + 1} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    )
  }

  return <span className="text-sm">{String(value)}</span>
}
