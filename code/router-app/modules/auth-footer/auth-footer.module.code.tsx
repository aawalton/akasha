import { useSidebarState } from "akasha/design/interface/layout/modules/use-sidebar-state/use-sidebar-state.module.code.ts"
import { LogIn, LogOut, Settings } from "lucide-react"
import { Link } from "react-router"

const FOOTER_LINK =
  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"

export function SettingsFooterLink() {
  const { effectiveIsCollapsed } = useSidebarState()

  return (
    <Link to="/settings" className={FOOTER_LINK}>
      <Settings className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Settings</span>}
    </Link>
  )
}

export function AuthFooter({ signedIn }: { signedIn: boolean }) {
  const { effectiveIsCollapsed } = useSidebarState()

  if (signedIn) {
    return (
      <form method="POST" action="/sign-out">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!effectiveIsCollapsed && <span>Sign Out</span>}
        </button>
      </form>
    )
  }

  return (
    <Link to="/sign-in" className={FOOTER_LINK}>
      <LogIn className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Sign In</span>}
    </Link>
  )
}
