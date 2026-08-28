"use client"

import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@shared/design-primitives/components/command"
import { Popover, PopoverAnchor, PopoverContent } from "@shared/design-primitives/components/popover"
import type { HeadingLevel, V1BlockType } from "@shared/pages-core/property-types/rich-document-ops"
import { assertNever } from "@shared/utils-narrow/assert-never"
import {
  CheckSquare,
  ChevronRight,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  type LucideIcon,
  Minus,
  Quote,
  Type,
} from "lucide-react"

export interface SlashChoice {
  readonly key: string
  readonly label: string
  readonly icon: LucideIcon
  readonly type: V1BlockType
  readonly level?: HeadingLevel
}

function iconFor(type: V1BlockType): LucideIcon {
  switch (type) {
    case "paragraph":
      return Type
    case "heading":
      return Heading1
    case "bulleted-list-item":
      return List
    case "numbered-list-item":
      return ListOrdered
    case "to-do":
      return CheckSquare
    case "quote":
      return Quote
    case "toggle":
      return ChevronRight
    case "code":
      return Code
    case "divider":
      return Minus
    default:
      return assertNever(type)
  }
}

function labelFor(type: V1BlockType): string {
  switch (type) {
    case "paragraph":
      return "Text"
    case "heading":
      return "Heading"
    case "bulleted-list-item":
      return "Bulleted list"
    case "numbered-list-item":
      return "Numbered list"
    case "to-do":
      return "To-do list"
    case "quote":
      return "Quote"
    case "toggle":
      return "Toggle"
    case "code":
      return "Code"
    case "divider":
      return "Divider"
    default:
      return assertNever(type)
  }
}

const SLASH_CHOICES: readonly SlashChoice[] = [
  { key: "paragraph", label: labelFor("paragraph"), icon: iconFor("paragraph"), type: "paragraph" },
  { key: "heading-1", label: "Heading 1", icon: Heading1, type: "heading", level: 1 },
  { key: "heading-2", label: "Heading 2", icon: Heading2, type: "heading", level: 2 },
  { key: "heading-3", label: "Heading 3", icon: Heading3, type: "heading", level: 3 },
  {
    key: "bulleted-list-item",
    label: labelFor("bulleted-list-item"),
    icon: iconFor("bulleted-list-item"),
    type: "bulleted-list-item",
  },
  {
    key: "numbered-list-item",
    label: labelFor("numbered-list-item"),
    icon: iconFor("numbered-list-item"),
    type: "numbered-list-item",
  },
  { key: "to-do", label: labelFor("to-do"), icon: iconFor("to-do"), type: "to-do" },
  { key: "quote", label: labelFor("quote"), icon: iconFor("quote"), type: "quote" },
  { key: "toggle", label: labelFor("toggle"), icon: iconFor("toggle"), type: "toggle" },
  { key: "code", label: labelFor("code"), icon: iconFor("code"), type: "code" },
  { key: "divider", label: labelFor("divider"), icon: iconFor("divider"), type: "divider" },
]

interface SlashMenuProps {
  open: boolean
  onSelect: (choice: SlashChoice) => void
  onClose: () => void
  children: React.ReactNode
}

export function SlashMenu({ open, onSelect, onClose, children }: SlashMenuProps) {
  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose()
      }}
    >
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      <PopoverContent align="start" side="bottom" sideOffset={4} className="w-64 p-0">
        <Command loop>
          <CommandInput placeholder="Filter blocks…" />
          <CommandList>
            <CommandEmpty>No blocks</CommandEmpty>
            {SLASH_CHOICES.map((choice) => {
              const Icon = choice.icon
              return (
                <CommandItem
                  key={choice.key}
                  value={choice.label}
                  onSelect={() => onSelect(choice)}
                >
                  <Icon className="size-4 text-tertiary" />
                  <span>{choice.label}</span>
                </CommandItem>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
