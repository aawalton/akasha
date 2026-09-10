import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"

const textVariants = cva("cursor-default", {
  variants: {
    variant: {
      description: "text-secondary text-sm",
      hint: "text-secondary text-xs",
      caption: "text-tertiary text-xs",
      prose: "text-secondary text-sm leading-relaxed",
    },
  },
  defaultVariants: { variant: "description" },
})

type TextElement = "p" | "span" | "div"

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>

const DEFAULT_ELEMENT: Record<TextVariant, TextElement> = {
  description: "p",
  hint: "span",
  caption: "span",
  prose: "p",
}

function Text({
  variant = "description",
  as,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & VariantProps<typeof textVariants> & { as?: TextElement }) {
  const tag = { element: as ?? (variant != null ? DEFAULT_ELEMENT[variant] : undefined) ?? "p" }

  return (
    <tag.element data-slot="text" className={cn(textVariants({ variant }), className)} {...props} />
  )
}

export { Text, textVariants }
