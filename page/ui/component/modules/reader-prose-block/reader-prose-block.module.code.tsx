"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  type ProseBlock,
  splitInlineEmphasis,
} from "akasha/page/ui/component/modules/reader-prose/reader-prose.module.code.ts"
import { Fragment } from "react"

export function ProseBlockView({ block }: { block: ProseBlock }) {
  const surface = useSurface()
  if (block.kind === "scene-break") {
    return <hr aria-hidden className="mx-auto w-16 border-primary/15 border-t" />
  }
  if (block.kind === "fence") {
    return (
      <pre
        className={cn(
          surfaceClass(surface + 1),
          "overflow-x-auto whitespace-pre rounded p-3 font-mono text-secondary text-sm"
        )}
      >
        {block.text}
      </pre>
    )
  }
  return (
    <p className="m-0">
      {splitInlineEmphasis(block.text).map((segment, index) =>
        segment.kind === "em" ? (
          <em key={`em-${index}`}>{segment.text}</em>
        ) : (
          <Fragment key={`text-${index}`}>{segment.text}</Fragment>
        )
      )}
    </p>
  )
}
