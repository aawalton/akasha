import {
  createGenericEditorLayout,
  createGenericLayout,
} from "../column-layout/column-layout.module.code.ts"
import type { PageLayoutSkeletonConfig } from "../page-layout/page-layout.module.code.tsx"

export function listPageSkeleton(opts?: {
  titleWidth?: number
  initialTab?: string
}): PageLayoutSkeletonConfig {
  return {
    header: { titleWidth: opts?.titleWidth ?? 192, actionButtons: 1 },
    hasTabs: true,
    initialTab: opts?.initialTab,
    filterBar: { buttonCount: 3 },
    content: createGenericLayout(),
  }
}

export function editorPageSkeleton(opts?: {
  initialTab?: string
  defaultTab?: string
}): PageLayoutSkeletonConfig {
  return {
    header: { titleWidth: 192, showMobileBackButton: true, actionButtons: 4 },
    hasTabs: true,
    initialTab: opts?.initialTab,
    defaultTab: opts?.defaultTab ?? "general",
    content: createGenericEditorLayout(),
  }
}

export function simplePageSkeleton(opts?: { titleWidth?: number }): PageLayoutSkeletonConfig {
  return {
    header: { titleWidth: opts?.titleWidth ?? 192 },
    content: createGenericLayout(),
  }
}

export function tabbedPageSkeleton(opts: {
  titleWidth?: number
  initialTab?: string
  defaultTab: string
  tabs?: readonly string[]
}): PageLayoutSkeletonConfig {
  const content: Record<string, ReturnType<typeof createGenericLayout>> = {}
  if (opts.tabs) {
    for (const tab of opts.tabs) {
      content[tab] = createGenericLayout()
    }
  }

  return {
    header: { titleWidth: opts.titleWidth ?? 192 },
    hasTabs: true,
    initialTab: opts.initialTab,
    defaultTab: opts.defaultTab,
    content: opts.tabs ? content : createGenericLayout(),
  }
}
