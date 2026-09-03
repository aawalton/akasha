;(() => {
  try {
    const stored = localStorage.getItem("sidebar-collapsed")
    const width = window.innerWidth
    if (width >= 584) {
      document.documentElement.dataset.sidebar =
        width < 776 || stored === "true" ? "collapsed" : "expanded"
    }
  } catch {}
})()
