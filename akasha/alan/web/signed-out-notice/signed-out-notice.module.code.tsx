"use client"

import { Link, useLocation } from "react-router"
import { SIGNED_OUT_MESSAGE } from "../auth-error/auth-error.module.code.ts"

export function SignedOutNotice() {
  const location = useLocation()
  const next = `${location.pathname}${location.search}`
  const href = `/sign-in?next=${encodeURIComponent(next)}`
  return (
    <p className="font-mono text-[12px] text-red">
      ! {SIGNED_OUT_MESSAGE}{" "}
      <Link to={href} className="text-accent underline">
        Sign in
      </Link>
    </p>
  )
}
