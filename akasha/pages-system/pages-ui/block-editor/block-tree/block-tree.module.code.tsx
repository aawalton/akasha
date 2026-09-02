"use client"

import type { Block } from "@akasha/pages-core/property-types/rich-document"
import type { ReactNode } from "react"

interface BlockTreeProps {
  blocks: readonly Block[]
  renderRow: (block: Block) => ReactNode
  isCollapsed: (id: string) => boolean
}

export function BlockTree({ blocks, renderRow, isCollapsed }: BlockTreeProps) {
  return (
    <>
      {blocks.map((block, i) => {
        const blockId = block.id ?? `idx-${i}`
        const kids = block.children
        const showKids = kids !== undefined && kids.length > 0 && !isCollapsed(blockId)
        return (
          <div key={blockId}>
            {renderRow(block)}
            {showKids && (
              <div className="flex flex-col gap-0.5 pl-6">
                <BlockTree blocks={kids} renderRow={renderRow} isCollapsed={isCollapsed} />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
