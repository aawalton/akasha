#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names
# the seam set and is not a program of its own. The Capacitor template builds the
# app target for iOS 15, and the app is built for iOS 17, as its widget is.
if grep -q "IPHONEOS_DEPLOYMENT_TARGET = 15.0;" "$PROJECT_PBXPROJ/project.pbxproj"; then
  perl -0pi -e 's/IPHONEOS_DEPLOYMENT_TARGET = 15\.0;/IPHONEOS_DEPLOYMENT_TARGET = 17.0;/g' \
    "$PROJECT_PBXPROJ/project.pbxproj"
  echo "OK: raised App target IPHONEOS_DEPLOYMENT_TARGET 15.0 -> 17.0"
else
  echo "OK: no 15.0 deployment target to raise (already >= 17)"
fi
