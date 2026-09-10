"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const surface = useSurface()
  const values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
          surfaceClass(surface + 1)
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={
            "absolute bg-accent data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          }
        />
      </SliderPrimitive.Track>
      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full bg-accent shadow-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-[0.38] focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
