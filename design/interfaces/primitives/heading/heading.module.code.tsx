import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"

const headingVariants = cva("cursor-default select-none", {
  variants: {
    variant: {
      subsection: "font-medium text-primary text-sm",
      "subsection-accent": "font-semibold text-accent text-sm",
      label: "font-medium text-secondary text-xs uppercase tracking-wider",
      "label-muted": "font-medium text-tertiary text-xs uppercase tracking-wider",
    },
  },
  defaultVariants: { variant: "subsection" },
})

type HeadingElement = "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span"

type HeadingVariant = NonNullable<VariantProps<typeof headingVariants>["variant"]>

const DEFAULT_ELEMENT: Record<HeadingVariant, HeadingElement> = {
  subsection: "h4",
  "subsection-accent": "h4",
  label: "div",
  "label-muted": "div",
}

function Heading({
  variant = "subsection",
  as,
  className,
  ...props
}: React.ComponentProps<"h4"> & VariantProps<typeof headingVariants> & { as?: HeadingElement }) {
  const tag = { element: as ?? (variant != null ? DEFAULT_ELEMENT[variant] : undefined) ?? "h4" }

  return (
    <tag.element
      data-slot="heading"
      className={cn(headingVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Heading, headingVariants }
