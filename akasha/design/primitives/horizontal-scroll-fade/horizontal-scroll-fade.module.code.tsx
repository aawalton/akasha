"use client"

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { cn } from "../cn/cn.module.code.ts"

interface HorizontalScrollFadeProps {
  children: ReactNode
  className?: string
  fadeWidth?: number
}

export function HorizontalScrollFade({
  children,
  className,
  fadeWidth = 16,
}: HorizontalScrollFadeProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollState()

    el.addEventListener("scroll", updateScrollState, { passive: true })
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener("scroll", updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState])

  const getMaskStyle = (): React.CSSProperties | undefined => {
    if (!canScrollLeft && !canScrollRight) return undefined

    const leftFade = `linear-gradient(to right, transparent, black ${fadeWidth}px)`
    const rightFade = `linear-gradient(to left, transparent, black ${fadeWidth}px)`
    const solid = "linear-gradient(black, black)"

    if (canScrollLeft && canScrollRight) {
      return {
        maskImage: `${leftFade}, ${solid}, ${rightFade}`,
        maskSize: `${fadeWidth}px 100%, calc(100% - ${fadeWidth * 2}px) 100%, ${fadeWidth}px 100%`,
        maskPosition: "left, center, right",
        maskRepeat: "no-repeat",
      }
    }
    if (canScrollLeft) {
      return {
        maskImage: `${leftFade}, ${solid}`,
        maskSize: `${fadeWidth}px 100%, calc(100% - ${fadeWidth}px) 100%`,
        maskPosition: "left, right",
        maskRepeat: "no-repeat",
      }
    }
    if (canScrollRight) {
      return {
        maskImage: `${solid}, ${rightFade}`,
        maskSize: `calc(100% - ${fadeWidth}px) 100%, ${fadeWidth}px 100%`,
        maskPosition: "left, right",
        maskRepeat: "no-repeat",
      }
    }
    return undefined
  }

  const hasOverflow = canScrollLeft || canScrollRight

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!hasOverflow) return

    const el = scrollRef.current
    if (!el) return

    isDragging.current = true
    hasDragged.current = false
    startX.current = e.clientX
    scrollLeftStart.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
    e.stopPropagation()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return

    const el = scrollRef.current
    if (!el) return

    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 3) {
      hasDragged.current = true
    }
    el.scrollLeft = scrollLeftStart.current - dx
    e.stopPropagation()
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return

    isDragging.current = false
    const el = scrollRef.current
    if (el) {
      el.releasePointerCapture(e.pointerId)
    }
    e.stopPropagation()
  }

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div
      ref={scrollRef}
      role="group"
      className={cn(
        "scrollbar-none select-none overflow-x-auto",
        hasOverflow && "cursor-grab active:cursor-grabbing",
        className
      )}
      style={getMaskStyle()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
