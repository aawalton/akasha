export interface ShellEmptyState {
  showBareEmpty: boolean
  showEmptyViewState: boolean
}

export function deriveShellEmptyState(args: {
  isViewMode: boolean
  viewCount: number
  tabCount: number
  loading: boolean
}): ShellEmptyState {
  return {
    showBareEmpty: args.tabCount === 0 && !args.isViewMode && !args.loading,
    showEmptyViewState: args.isViewMode && args.viewCount === 0,
  }
}
