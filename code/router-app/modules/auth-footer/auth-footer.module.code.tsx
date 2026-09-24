import { useSidebarState } from "akasha/design/interface/layout/modules/use-sidebar-state/use-sidebar-state.module.code.ts"
import { LogIn, LogOut } from "lucide-react"
import { Link } from "react-router"

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
    <Link
      to="/sign-in"
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
    >
      <LogIn className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Sign In</span>}
    </Link>
  )
}
