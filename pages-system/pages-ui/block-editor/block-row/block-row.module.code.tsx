"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Textarea } from "@akasha/design-primitives/textarea"
import { isTodoChecked } from "@akasha/pages-core/property-types/block-markers"
import type { ShorthandTransform } from "@akasha/pages-core/property-types/markdown-shorthand"
import type { Block } from "@akasha/pages-core/property-types/rich-document"
import type { HeadingLevel, V1BlockType } from "@akasha/pages-core/property-types/rich-document-ops"
import { useCoarsePointer } from "@akasha/pages-ui/block-editor/use-coarse-pointer"
import { useTextareaInput } from "../use-textarea-input/use-textarea-input.module.code.ts"

const BASE_TEXTAREA =
  "field-sizing-content min-h-0 w-full resize-none border-0 bg-transparent p-0 shadow-none outline-none focus-visible:outline-none"

function v1Type(block: Block): V1BlockType {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "bulleted-list-item":
    case "numbered-list-item":
    case "to-do":
    case "quote":
    case "toggle":
    case "code":
    case "divider":
      return block.type
    default:
      return "paragraph"
  }
}

function labelFor(type: V1BlockType): string {
  switch (type) {
    case "heading":
      return "Heading"
    case "bulleted-list-item":
    case "numbered-list-item":
      return "List"
    case "to-do":
      return "To-do"
    case "quote":
      return "Quote"
    case "toggle":
      return "Toggle"
    case "code":
      return "Code"
    default:
      return "Paragraph"
  }
}

export interface BlockRowProps {
  block: Block
  selected: boolean
  onChangeText: (text: string) => void
  onEnter: (caret: number) => void
  onArrowUp: () => void
  onArrowDown: () => void
  onDocumentExtreme: (direction: "start" | "end") => void
  onBackspaceAtStart: () => void
  onSlashTrigger: () => void
  onToggleTodo: () => void
  onShorthand: (transform: ShorthandTransform) => void
  onTurnInto: (type: V1BlockType, level?: HeadingLevel) => void
  onMoveBlock: (direction: "up" | "down") => void
  onIndent: () => void
  onOutdent: () => void
  onDuplicate: () => void
  onToggleCollapse: () => void
  onEscape: () => void
  onSelectRange: () => void
  onSelectToggle: () => void
  onFocusText: () => void
  onBlur: () => void
  textareaRef: React.Ref<HTMLTextAreaElement>
}

function BlockBody(props: BlockRowProps) {
  const { block } = props
  const type = v1Type(block)
  const text = typeof block.text === "string" ? block.text : ""
  const { ref, ...handlers } = useTextareaInput(props)

  if (type === "divider") {
    return (
      <div className="py-2">
        <hr className="border-primary/15" aria-label="Divider" />
      </div>
    )
  }

  const strikeThrough = type === "to-do" && isTodoChecked(text)
  return (
    <Textarea
      ref={ref}
      rows={1}
      value={text}
      aria-label={labelFor(type)}
      className={cn(BASE_TEXTAREA, strikeThrough && "text-tertiary line-through")}
      {...handlers}
    />
  )
}

export function BlockRow(props: BlockRowProps) {
  const coarse = useCoarsePointer()
  const isToggle = v1Type(props.block) === "toggle"
  return (
    <div
      data-selected={props.selected}
      className={cn("relative rounded-sm px-0.5", props.selected && "bg-accent/15")}
    >
      <BlockBody {...props} />
      {isToggle && coarse && (
        <button
          type="button"
          aria-label="Toggle collapse"
          tabIndex={-1}
          onPointerDown={(e) => {
            e.preventDefault()
            props.onToggleCollapse()
          }}
          className="absolute -top-2.5 left-0 h-11 w-11 border-0 bg-transparent p-0 outline-none"
        />
      )}
    </div>
  )
}
